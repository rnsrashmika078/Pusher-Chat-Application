import { z } from "zod";

export const signInSchema = z.object({
    username: z
        .string()
        .min(4, "Username must be at least 5 characters")
        .nonempty("Username is required"),
    password: z
        .string()
        .min(5, "Password must be at least 5 characters")
        .nonempty("Password is required"),
});

export const signUpSchema = z
    .object({
        firstname: z
            .string()
            .max(20, "First name must be at most 20 characters")
            .nonempty("First name is required"),
        lastname: z
            .string()
            .max(20, "Last name must be at most 20 characters")
            .nonempty("Last name is required"),
        username: z
            .string()
            .min(4, "Username must be at least 5 characters")
            .nonempty("Username is required"),
        password: z
            .string()
            .min(5, "Password must be at least 5 characters")
            .nonempty("Password is required"),
        confirm: z
            .string()
            .min(5, "Confirm password must be at least 5 characters")
            .nonempty("Confirm password is required"),
    })
    .refine((data) => data.password === data.confirm, {
        message: "Passwords do not match",
        path: ["confirm"],
    });
