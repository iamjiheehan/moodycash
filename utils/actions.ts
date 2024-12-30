'use server';

import db from './db';
import { auth, clerkClient, currentUser } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {
    profileSchema,
    serviceSchema,
    bankingSchema,
    validateWithZodSchema,
} from './schemas';

const getAuthUser = async () => {
    const user = await currentUser();
    if (!user) throw new Error('You must be logged in to access this route');

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
        if (!user) throw new Error('Please login to create a profile');

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
    const profile = await db.profile.findUnique({
        where: { clerkId: user.id },
    });

    if (!profile) redirect('/profile/create');

    return profile;
};

export const updateProfileAction = async (
    prevState: any,
    formData: FormData
): Promise<{ message: string }> => {
    const user = await getAuthUser();
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
        return { message: 'Profile updated successfully' };
    } catch (error) {
        return renderError(error);
    }
};

export const createServiceAction = async (
    prevState: any,
    formData: FormData
): Promise<{ message: string }> => {
    const user = await getAuthUser();
    try {
        const rawData = Object.fromEntries(formData);
        const validatedFields = validateWithZodSchema(serviceSchema, rawData);

        await db.service.create({
            data: {
                ...validatedFields,
                profileId: user.id,
            },
        });
    } catch (error) {
        return renderError(error);
    }
    redirect('/');
};

export const deleteServiceAction = async (prevState: { serviceId: string }) => {
    const { serviceId } = prevState;
    const user = await getAuthUser();

    try {
        await db.service.delete({
            where: {
                id: serviceId,
                profileId: user.id,
            },
        });

        revalidatePath('/mood');
        return { message: 'MoodInfo is deleted successfully' };
    } catch (error) {
        return renderError(error);
    }
};
