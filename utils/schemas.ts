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
            const wordCount = description.split(' ').length;
            return wordCount >= 10 && wordCount <= 1000;
        },
        {
            message: 'description must be between 10 and 1000 words.',
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
