import { z } from 'zod';

export const profileSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    username: z.string(),
});

export const serviceSchema = z.object({
    date: z.string(),
    description: z.string().refine(
        (description) => {
            const charCount = description.length;
            return charCount <= 50;
        },
        {
            message: 'description must be 50 characters or less.',
        }
    ),
    mood: z.string().refine(
        (description) => {
            const wordCount = description.split(' ').length;
            return wordCount >= 10 && wordCount <= 10;
        },
        {
            message: 'mood must be between 10 and 10 words.',
        }
    ),
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
    accountHolder: z.string(),
    bank: z.string(),
    date: z.string(),
    account: z.string(),
    description: z.string(),
    price: z.coerce.number().int(),
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
