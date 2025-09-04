import { useQuery } from "@tanstack/react-query";
import {
    getActiveAssistance,
    getResidentApplicationHistory,
} from "../../api/financial-assistance/api";

export const useGetActiveAssistance = () => {
    const { data, isLoading, refetch } = useQuery({
        queryKey: ["active-assistance"],
        queryFn: ({ signal }) => getActiveAssistance({ signal }),
        staleTime: 0,
        refetchOnMount: true,
    });

    const assistanceLists = data?.map((item: any) => ({
        id: item.id,
        title: item.name,
        description: item.description,
    }));

    return {
        data,
        isLoading,
        refetch,
        assistanceLists,
    };
};

export const useGetResidentApplicationHistory = () => {
    const { data, isLoading, refetch } = useQuery({
        queryKey: ["resident-application-history"],
        queryFn: ({ signal }) => getResidentApplicationHistory({ signal }),
        refetchOnMount: true,
        staleTime: 0,
    });

    return {
        data,
        isLoading,
        refetch,
    };
};
