import { z } from "zod";

export const personalDetailsSchema = z.object({
    first_name: z.string().min(1, { message: "First Name field is required" }),
    middle_name: z.string(),
    last_name: z.string().min(1, { message: "Last Name field is required" }),
    suffix: z.string(),
    sex: z.string().min(1, { message: "Sex field is required" }),
    birth_date: z.string().min(1, { message: "Birth Date field is required" }),
    birth_place: z.string().min(1, { message: "Birth Place field is required" }),
    nationality: z.string().min(1, { message: "Nationality field is required" }),
    religion: z.string().min(1, { message: "Religion field is required" }),
    civil_status: z.string().min(1, { message: "Civil Status field is required" }),
    occupation: z.string(),
});

export type PersonalDetailsSchemaType = z.infer<typeof personalDetailsSchema>;

export const contactAddressSchema = z.object({
    street: z.string().min(1, { message: "Street field is required" }),
    barangay: z.string(),
    city: z.string(),
    province: z.string(),
    country: z.string(),
    postal_code: z.string().min(1, { message: "Postal Code field is required" }),
    email_address: z.string().min(1, { message: "Email Address field is required" }),
    mobile_number: z.string().min(1, { message: "Mobile Number field is required" }),
    telephone_number: z.string(),
});

export type ContactAddressSchemaType = z.infer<typeof contactAddressSchema>;

export const governmentProgramsSchema = z
    .object({
        is_pwd: z.boolean().optional(),
        is_single_parent: z.boolean().optional(),
        is_senior_citizen: z.boolean().optional(),
        pwd_id_no: z.string().optional(),
        no_of_dependents: z.string().optional(),
        senior_citizen_id_no: z.string().optional(),
    })
    .superRefine((data, ctx) => {
        const validateId = (
            condition: boolean | undefined,
            idValue: string | undefined,
            idFieldName: string,
            message: string
        ) => {
            if (condition && !idValue) {
                ctx.addIssue({
                    path: [idFieldName], // Fix: Use field name instead of value
                    code: z.ZodIssueCode.custom,
                    message: message,
                });
            }
        };

        validateId(
            data.is_pwd,
            data.pwd_id_no,
            "pwd_id_no",
            "PWD ID is required if the person is a PWD"
        );
        validateId(
            data.is_single_parent,
            data.no_of_dependents,
            "no_of_dependents",
            "Number of Dependents is required if the person is a Single Parent"
        );
        validateId(
            data.is_senior_citizen,
            data.senior_citizen_id_no,
            "senior_citizen_id_no",
            "Senior Citizen ID is required if the person is a Senior Citizen"
        );
    });

export type GovernmentProgramsSchemaType = z.infer<typeof governmentProgramsSchema>;

export const identityVerificationSchema = z.object({
    id_type: z.string().min(1, { message: "ID Type field is required" }),
    id_front_image: z.string().min(1, { message: "ID Front Image field is required" }),
    id_back_image: z.string().min(1, { message: "ID Back Image field is required" }),
    id_selfie_image: z.string().min(1, { message: "ID Selfie Image field is required" }),
});

export type IdentityVerificationSchemaType = z.infer<typeof identityVerificationSchema>;
