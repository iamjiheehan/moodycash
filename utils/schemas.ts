import { z } from 'zod';
import { fetchProfile } from './actions';

const fetchUserName = async (): Promise<string> => {
    try {
        const profile = await fetchProfile();
        const validatedProfile = validateWithZodSchema(profileSchema, profile);
        return `${validatedProfile.lastName}${validatedProfile.firstName}`;
    } catch (error) {
        console.error('Failed to fetch user name:', error);
        throw new Error('사용자 이름을 가져오는데 실패했습니다.');
    }
};

export const validateBankingSchema = async (data: unknown) => {
    try {
        const userName = await fetchUserName();

        const validatedBankingData = validateWithZodSchema(bankingSchema, data);

        if (validatedBankingData.bankAccountHolder !== userName) {
            throw new Error(
                `예금주(${validatedBankingData.bankAccountHolder})와 사용자 이름(${userName})이 일치하지 않습니다.`
            );
        }

        return validatedBankingData; 
    } catch (error) {
        console.error('Validation failed:');
        throw error; 
    }
};

export const profileSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    username: z.string(),
});

export const serviceSchema = z.object({
    date: z.string().datetime(),
    description: z
        .string()
        .max(50, { message: '메모는 50자 이하이어야 합니다.' }),
    mood: z.string().max(20, { message: '기분은 20자 이하이어야 합니다.' }),
    price: z.coerce
        .number()
        .int()
        .min(0, { message: '금액은 양수여야 합니다.' })
        .max(9999, { message: '금액은 9999 이하이어야 합니다.' }),
    bankingId: z
        .string()
        .nonempty({ message: '은행 정보가 누락되었습니다. 다시 시도해주세요.' }),
});

export const bankingSchema = z.object({
    mood: z
        .string()
        .max(20, { message: '기분은 20자 이하이어야 합니다.' })
        .nonempty({ message: '기분은 필수 입력 사항입니다.' }),
    bankName: z
        .string()
        .nonempty({ message: '은행 이름은 필수 입력 사항입니다.' }),
    bankAccountHolder: z
        .string()
        .nonempty({ message: '예금주는 필수 입력 사항입니다.' }),
    bankAccountNumber: z
        .string()
        .nonempty({ message: '계좌 번호는 필수 입력 사항입니다.' }),
});

export function validateWithZodSchema<T>(
    schema: z.ZodSchema<T>,
    data: unknown
): T {
    const result = schema.safeParse(data);
    if (!result.success) {
        const errors = result.error.errors.map((error) => error.message);
        throw new Error(errors.join(','));
    }

    return result.data;
}
