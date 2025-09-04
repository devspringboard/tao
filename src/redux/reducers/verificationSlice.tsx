import { createSlice } from "@reduxjs/toolkit";
import {
    ContactAddressSchemaType,
    GovernmentProgramsSchemaType,
    IdentityVerificationSchemaType,
    PersonalDetailsSchemaType,
} from "../../validations/profileVerificationSchema";

const initialState: {
    personalDetails: PersonalDetailsSchemaType | null;
    contactAddress: ContactAddressSchemaType | null;
    governmentPrograms: GovernmentProgramsSchemaType | null;
    identityVerification: IdentityVerificationSchemaType | null;
} = {
    personalDetails: null,
    contactAddress: null,
    governmentPrograms: null,
    identityVerification: null,
};
const verificationSlice = createSlice({
    name: "verification",
    initialState,
    reducers: {
        setPersonalDetails: (state, action) => {
            state.personalDetails = action.payload;
        },
        setContactAddress: (state, action) => {
            state.contactAddress = action.payload;
        },
        setGovernmentPrograms: (state, action) => {
            state.governmentPrograms = action.payload;
        },
        setIdentityVerification: (state, action) => {
            state.identityVerification = action.payload;
        },
    },
});

export const {
    setPersonalDetails,
    setContactAddress,
    setGovernmentPrograms,
    setIdentityVerification,
} = verificationSlice.actions;
export default verificationSlice.reducer;
