import { z } from 'zod';

export const userLoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(5, { message: 'Password must be at least 6 characters long' }),
});

export const userRegisterSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(5, { message: 'Password must be at least 6 characters long' }),
});