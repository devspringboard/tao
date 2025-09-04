import axiosClient from "../axios";
import { ApplyForAssistanceProps } from "../../../types/appTypes";

export const getActiveAssistance = async ({ signal }: { signal?: AbortSignal }) => {
    const response = await axiosClient.get("/residents/programs", { signal });
    return response.data;
};

export const applyForAssistance = async ({
    data,
    signal,
}: {
    data: ApplyForAssistanceProps;
    signal?: AbortSignal;
}) => {
    const file = Array.isArray(data.file) ? data.file[0].blob : data.file;

    const formData = new FormData();
    formData.append("program_id", data.program_id.toString());

    if (file) {
        formData.append("supporting_documents", file as unknown as Blob);
    }

    const response = await axiosClient.post("/residents/programs/application", formData, {
        signal,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response;
};

export const getResidentApplicationHistory = async ({ signal }: { signal?: AbortSignal }) => {
    const response = await axiosClient.get("/residents/programs/application", { signal });
    return response.data;
};
