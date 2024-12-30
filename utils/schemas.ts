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
        .max(50, { message: 'Mood must be 50 characters or less.' }),
    mood: z
        .string()
        .max(20, { message: 'Mood must be 20 characters or less.' }),
    price: z.coerce
        .number()
        .int()
        .min(0, {
            message: 'price must be a positive number.',
        })
        .max(1000, {
            message: 'price must be 1000 or less.',
        }),
});

export const bankingSchema = z.object({
    date: z.string(),
    mood: z
        .string()
        .max(20, { message: 'Mood must be 20 characters or less.' }),
    bankName: z.string(),
    bankAccountHolder: z.string(),
    bankAccountNumber: z.string(),
    description: z
        .string()
        .max(20, { message: 'Description must be 20 characters or less.' }),
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
