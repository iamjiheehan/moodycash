import * as z from 'zod';

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
