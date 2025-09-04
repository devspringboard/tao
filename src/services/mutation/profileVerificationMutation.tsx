import { useMutation } from "@tanstack/react-query";
import { createProfile, updateUserVerification } from "../api/profile-verification/api";
import { CreateProfileProps, UpdateUserVerificationProps, UserProps } from "../../types/appTypes";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export const useCreateProfile = () => {
    const user = useSelector((state: RootState) => state.auth.user) as UserProps | null;

    const { isPending, mutateAsync: createProfileMutation } = useMutation({
        mutationFn: (payload: CreateProfileProps) => createProfile(payload),
        mutationKey: ["createProfile"],
    });

    return {
        isPending,
        createProfile: createProfileMutation,
    };
};

export const useUpdateUserVerification = () => {
    const { isPending, mutateAsync: updateUserVerificationMutation } = useMutation({
        mutationFn: (payload: UpdateUserVerificationProps) => updateUserVerification(payload),
        mutationKey: ["updateUserVerification"],
    });

    return {
        isPending,
        updateUserVerification: updateUserVerificationMutation,
    };
};
