import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().min(1, { message: "Email is required" }),
    password: z.string().min(1, { message: "Password is required" }),
});
export type LoginSchemaType = z.infer<typeof loginSchema>;

export const otpSchema = z.object({
    otp: z
        .number({
            invalid_type_error: "OTP is required",
        })
        .min(1, { message: "OTP is required" }),
});
export type OtpSchemaType = z.infer<typeof otpSchema>;

//Signup Schema
export const signupSchema = z
    .object({
        first_name: z.string().min(1, { message: "First Name is required" }),
        middle_name: z.string(),
        last_name: z.string().min(1, { message: "Last Name is required" }),
        email: z.string().min(1, { message: "Email Address is required" }),
        barangay_id: z.string().min(1, { message: "Barangay is required" }),
        password: z
            .string()
            .regex(
                /^(?=.*[A-Z])(?=.*[\W_])(?=.*\d)[A-Za-z\d\W_]{8,}$/,
                "Password must be exactly 8 characters long, include at least one uppercase letter, one special character, and one number."
            ),
        password_confirmation: z.string().min(1, { message: "Password Confirmation is required" }),
    })
    .refine((data) => data.password === data.password_confirmation, {
        message: "Passwords do not match.",
        path: ["password_confirmation"],
    });

export type SignupSchemaType = z.infer<typeof signupSchema>;

//Change Password Schema
export const changePasswordSchema = z
    .object({
        old_password: z.string().min(1, { message: "Old Password is required" }),

        new_password: z
            .string()
            .min(8, { message: "Password must be at least 8 characters long." })
            .regex(
                /^(?=.*[A-Z])(?=.*[\W_])(?=.*\d)/,
                "Password must include at least one uppercase letter, one special character, and one number."
            ),

        confirm_new_password: z.string().min(1, { message: "Password Confirmation is required" }),
    })
    .refine((data) => data.new_password === data.confirm_new_password, {
        message: "Passwords do not match.",
        path: ["confirm_new_password"],
    });

export type ChangePasswordSchemaType = z.infer<typeof changePasswordSchema>;
