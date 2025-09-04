import { useQuery } from "@tanstack/react-query";
import {
    getAcceptingIds,
    getCivilStatus,
    getGender,
    getReligions,
    getResidentProfile,
    getVerificationStatus,
} from "../../api/profile-verification/api";

export const useGetCivilStatus = () => {
    const { data, isLoading, refetch } = useQuery({
        queryKey: ["civil-status"],
        queryFn: ({ signal }) => getCivilStatus({ signal }),
    });

    const civilStatusOptions = data?.map((item: any) => ({
        label: item.name,
        value: item.id,
    }));

    return {
        data,
        isLoading,
        refetch,
        civilStatusOptions,
    };
};

export const useGetReligions = () => {
    const { data, isLoading, refetch } = useQuery({
        queryKey: ["religions"],
        queryFn: ({ signal }) => getReligions({ signal }),
    });

    const religionsOptions = data?.map((item: any) => ({
        label: item.name,
        value: item.id,
    }));

    return {
        data,
        isLoading,
        refetch,
        religionsOptions,
    };
};

export const useGetGender = () => {
    const { data, isLoading, refetch } = useQuery({
        queryKey: ["gender"],
        queryFn: ({ signal }) => getGender({ signal }),
    });

    const genderOptions = data?.map((item: any) => ({
        label: item.label,
        value: item.value,
    }));

    return {
        data,
        isLoading,
        refetch,
        genderOptions,
    };
};

export const useGetResidentProfile = ({ id }: { id: number }) => {
    const { data, isLoading, refetch } = useQuery({
        queryKey: ["resident-profile"],
        queryFn: ({ signal }) => getResidentProfile({ id, signal }),
        enabled: !!id,
    });

    return {
        data,
        isLoading,
        refetch,
    };
};

export const useGetAcceptingIds = () => {
    const { data, isLoading, refetch } = useQuery({
        queryKey: ["accepting-ids"],
        queryFn: ({ signal }) => getAcceptingIds({ signal }),
    });

    const acceptingIdsOptions = data?.map((item: any) => ({
        label: item.name,
        value: item.id,
    }));

    return {
        data,
        isLoading,
        refetch,
        acceptingIdsOptions,
    };
};

export const useGetVerificationStatus = ({ id }: { id: number }) => {
    const { data, isLoading, refetch } = useQuery({
        queryKey: ["verification-status"],
        queryFn: ({ signal }) => getVerificationStatus({ id, signal }),
        enabled: !!id,
        staleTime: 0,
        refetchOnMount: true,
    });

    return {
        data,
        isLoading,
        refetch,
    };
};
