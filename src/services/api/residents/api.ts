import axiosClient from "../axios";

export const getResidentDetails = async ({ id, signal }: { id: number; signal?: AbortSignal }) => {
    const response = await axiosClient.get(`/residents/profile/${id}`, { signal });
    return response.data;
};

export const getResidentWallet = async ({ signal }: { signal?: AbortSignal }) => {
    const response = await axiosClient.get(`/residents/wallet`, { signal });
    return response.data;
};
