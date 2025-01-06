import { z } from 'zod';

export const profileSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    username: z.string(),
});

export const serviceSchema = z.object({
    date: z.string(),
    description: z
        .string()
        .max(50, { message: '메모는 50자 이하이어야 합니다.' }),
    mood: z.string().max(20, { message: '기분은 20자 이하이어야 합니다.' }),
    price: z.coerce
        .number()
        .int()
        .min(0, { message: '금액은 양수여야 합니다.' })
        .max(9999, { message: '금액은 9999 이하이어야 합니다.' }),
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
        .nonempty({ message: '예금주명은 필수 입력 사항입니다.' }),
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
