import { useMutation } from "@tanstack/react-query";
import { applyForAssistance } from "../api/financial-assistance/api";
import { ApplyForAssistanceProps } from "../../types/appTypes";

export const useApplyForAssistance = () => {
    const { mutateAsync: applyForAssistanceMutation } = useMutation({
        mutationFn: (payload: { data: ApplyForAssistanceProps; signal?: AbortSignal }) =>
            applyForAssistance(payload),
    });

    return {
        applyForAssistanceMutation,
    };
};
