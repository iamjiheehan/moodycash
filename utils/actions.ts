'use server';

import db from './db';
import { clerkClient, currentUser } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {
    profileSchema,
    serviceSchema,
    bankingSchema,
    validateWithZodSchema,
    validateBankingSchema,
} from './schemas';

const getAuthUser = async () => {
    const user = await currentUser();
    if (!user) {
        console.log('No user found');
        return null;
    }

    if (!user.privateMetadata.hasProfile) redirect('/profile/create');
    return user;
};

const renderError = (error: unknown): { message: string } => {
    console.log(error);
    return {
        message: error instanceof Error ? error.message : 'An error occurred',
    };
};

export const createProfileAction = async (
    prevState: any,
    formData: FormData
) => {
    try {
        const user = await currentUser();
        if (!user) throw new Error('프로필 생성을 위해 로그인을 해주세요');

        const rawData = Object.fromEntries(formData);
        const validatedFields = profileSchema.parse(rawData);
        await db.profile.create({
            data: {
                clerkId: user.id,
                email: user.emailAddresses[0].emailAddress,
                profileImage: user.imageUrl ?? '',
                ...validatedFields,
            },
        });

        const clerk = await clerkClient();
        await clerk.users.updateUserMetadata(user.id, {
            privateMetadata: {
                hasProfile: true,
            },
        });
    } catch (error) {
        return renderError(error);
    }
    redirect('/');
};

export const fetchProfileImage = async (): Promise<string | null> => {
    const user = await currentUser();
    if (!user) return null;

    const profile = await db.profile.findUnique({
        where: { clerkId: user.id },
        select: { profileImage: true },
    });

    return profile?.profileImage ?? null;
};

export const fetchProfile = async () => {
    const user = await getAuthUser();
    if (!user) return null;

    const profile = await db.profile.findUnique({
        where: { clerkId: user.id },
    });

    if (!profile) redirect('/profile/create');

    return profile;
};

export const fetchMoods = async () => {
    const user = await currentUser();
    if (!user) {
        console.log('fetchMoods: No user found');
        return null;
    }

    try {
        const moods = await db.profile.findMany({
            where: { clerkId: user.id },
            select: {
                Banking: {
                    select: {
                        mood: true,
                    },
                },
            },
        });
        console.log('fetchMoods:', moods[0].Banking);
        return moods[0].Banking;
    } catch (error) {
        console.error('Error fetching moods:', error);
        return null;
    }
};

export const fetchBankings = async () => {
    const user = await getAuthUser();
    if (!user) return null;

    try {
        const bankings = await db.profile.findUnique({
            where: { clerkId: user.id },
            select: {
                Banking: {
                    select: {
                        id: true,
                        bankName: true,
                        bankAccountHolder: true,
                        bankAccountNumber: true,
                        mood: true,
                    },
                },
            },
        });

        return bankings;
    } catch (error) {
        console.error('Error fetching bankings:', error);
        return null;
    }
};

export const fetchServiceAction = async () => {
    const user = await getAuthUser();
    if (!user) return null;

    try {
        const services = await db.profile.findUnique({
            where: { clerkId: user.id },
            select: {
                Service: {
                    select: {
                        id: true,
                        date: true,
                        description: true,
                        price: true,
                        mood: true,
                    },
                },
            },
        });

        return services?.Service ?? null;
    } catch (error) {
        console.error('Error fetching service:', error);
        return renderError(error);
    }
};

export const fetchBankingDetails = async (bankingId: string) => {
    const user = await getAuthUser();
    if (!user) return null;

    return db.banking.findUnique({
        where: {
            id: bankingId,
            profileId: user.id,
        },
    });
};

export const updateProfileAction = async (
    prevState: any,
    formData: FormData
): Promise<{ message: string }> => {
    const user = await getAuthUser();
    if (!user) return { message: '로그인이 필요합니다' };

    try {
        const rawData = Object.fromEntries(formData);

        const validatedFields = profileSchema.safeParse(rawData);
        if (!validatedFields.success) {
            const errors = validatedFields.error.errors.map(
                (error) => error.message
            );
            throw new Error(errors.join(','));
        }

        await db.profile.update({
            where: {
                clerkId: user.id,
            },
            data: validatedFields.data,
        });
        revalidatePath('/profile');
        return { message: '프로필이 성공적으로 업데이트 되었습니다' };
    } catch (error) {
        return renderError(error);
    }
};

export const createServiceAction = async (
    prevState: any,
    formData: FormData
): Promise<{ message: string }> => {
    const user = await getAuthUser();
    if (!user) return { message: '로그인이 필요합니다' };

    try {
        const rawData = Object.fromEntries(formData);
        const validatedFields = validateWithZodSchema(serviceSchema, rawData);

        await db.service.create({
            data: {
                ...validatedFields,
                profileId: user.id,
            },
        });
        return { message: '성공적으로 등록되었습니다' };
    } catch (error) {
        return renderError(error);
    }
};

export const updateServiceAction = async (
    prevState: any,
    formData: FormData
): Promise<{ message: string }> => {
    const user = await getAuthUser();
    if (!user) return { message: '로그인이 필요합니다' };

    try {
        const rawData = Object.fromEntries(formData);

        const validatedFields = profileSchema.safeParse(rawData);
        if (!validatedFields.success) {
            const errors = validatedFields.error.errors.map(
                (error) => error.message
            );
            throw new Error(errors.join(','));
        }

        await db.profile.update({
            where: {
                clerkId: user.id,
            },
            data: validatedFields,
        });
        return { message: '해당 기록이 성공적으로 업데이트 되었습니다' };
    } catch (error) {
        return renderError(error);
    }
};

export const updateBankingAction = async (
    prevState: any,
    formData: FormData
): Promise<{ message: string }> => {
    const user = await getAuthUser();
    if (!user) return { message: '로그인이 필요합니다' };

    const bankingId = formData.get('id') as string;

    try {
        const rawData = Object.fromEntries(formData);

        const validatedFields = await validateBankingSchema(rawData); // Use validateBankingSchema

        const existingBanking = await db.banking.findFirst({
            where: {
                profileId: user.id,
                bankName: validatedFields.bankName,
                bankAccountNumber: validatedFields.bankAccountNumber,
                NOT: {
                    id: bankingId,
                },
            },
        });

        if (existingBanking) {
            throw new Error(
                '이미 존재하는 계좌입니다. 다른 계좌를 입력해주세요'
            );
        }

        const existingMoodBanking = await db.banking.findFirst({
            where: {
                profileId: user.id,
                mood: validatedFields.mood,
                NOT: {
                    id: bankingId,
                },
            },
        });

        if (existingMoodBanking) {
            throw new Error(
                '이미 존재하는 기분입니다. 다른 기분을 입력해주세요'
            );
        }

        await db.banking.update({
            where: {
                id: bankingId,
                profileId: user.id,
            },
            data: validatedFields,
        });
        revalidatePath('/settings');
        return { message: '해당 계좌가 성공적으로 업데이트 되었습니다' };
    } catch (error) {
        return renderError(error);
    }
};

export const deleteServiceAction = async (prevState: { serviceId: string }) => {
    const { serviceId } = prevState;
    const user = await getAuthUser();
    if (!user) return { message: '로그인이 필요합니다' };

    try {
        await db.service.delete({
            where: {
                id: serviceId,
                profileId: user.id,
            },
        });

        revalidatePath('/service');
        return { message: '해당 기록이 성공적으로 업데이트 되었습니다' };
    } catch (error) {
        return renderError(error);
    }
};

export const createBankingAction = async (
    prevState: any,
    formData: FormData
): Promise<{ message: string }> => {
    const user = await getAuthUser();
    if (!user) return { message: '로그인이 필요합니다' };

    try {
        const rawData = Object.fromEntries(formData);
        const validatedFields = await validateBankingSchema(rawData); // Use validateBankingSchema

        const bankingCount = await db.banking.count({
            where: {
                profileId: user.id,
            },
        });

        if (bankingCount >= 6) {
            throw new Error('계좌는 최대 6개까지만 등록 가능합니다');
        }

        const existingBanking = await db.banking.findFirst({
            where: {
                profileId: user.id,
                bankName: validatedFields.bankName,
                bankAccountNumber: validatedFields.bankAccountNumber,
            },
        });

        if (existingBanking) {
            throw new Error(
                '이미 존재하는 계좌입니다. 다른 계좌를 입력해주세요'
            );
        }
        const existingMoodBanking = await db.banking.findFirst({
            where: {
                profileId: user.id,
                mood: validatedFields.mood,
            },
        });

        if (existingMoodBanking) {
            throw new Error(
                '이미 존재하는 기분입니다. 다른 기분을 입력해주세요'
            );
        }

        await db.banking.create({
            data: {
                ...validatedFields,
                profileId: user.id,
            },
        });
    } catch (error) {
        return renderError(error);
    }
    redirect('/settings');
};

export const deleteBankingAction = async (prevState: { bankingId: string }) => {
    const { bankingId } = prevState;
    const user = await getAuthUser();
    if (!user) return { message: '로그인이 필요합니다' };

    try {
        await db.banking.delete({
            where: {
                id: bankingId,
                profileId: user.id,
            },
        });

        revalidatePath('/settings');
        return { message: '해당 계좌가 성공적으로 삭제되었습니다' };
    } catch (error) {
        return renderError(error);
    }
};
