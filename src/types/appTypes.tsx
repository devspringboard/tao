import { StatusBarInfo } from "@capacitor/status-bar";
import {
    PersonalDetailsSchemaType,
    ContactAddressSchemaType,
    GovernmentProgramsSchemaType,
    IdentityVerificationSchemaType,
} from "../validations/profileVerificationSchema";

export interface UserProps {
    id: number;
    email: string;
    first_name: string;
    middle_name?: string | null;
    last_name: string;
    created_at: string;
    email_verified_at: string;
    updated_at: string;
    last_logged_in: string;
    barangay_id?: number;
    full_name?: string;
    is_verified?: number;
}

export interface SignupProps {
    id: number;
    first_name: string;
    middle_name: string;
    email: string;
    barangay_id: string;
    password: string;
    password_confirmation: string;
}

export interface ChangePasswordProps {
    id: number;
    old_password: string;
    new_password: string;
    confirm_new_password: string;
}

export interface CreateProfileProps {
    personalDetails: PersonalDetailsSchemaType;
    contactAddress: ContactAddressSchemaType;
    governmentPrograms: GovernmentProgramsSchemaType;
    identityVerification: IdentityVerificationSchemaType;
    userId: number;
}

export interface UpdateUserVerificationProps {
    id: number;
    is_verified: number;
}

export interface ApplyForAssistanceProps {
    program_id: number;
    file?: File;
}
