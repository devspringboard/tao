import { useQuery } from "@tanstack/react-query";
import { getResidentDetails, getResidentWallet } from "../../api/residents/api";

export const useGetResidentDetails = ({ id }: { id: number }) => {
    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ["residentDetails", id],
        queryFn: ({ signal }) => getResidentDetails({ id, signal }),
        enabled: !!id,
    });

    return { data, isLoading, isError, refetch };
};

export const useGetResidentWallet = () => {
    const { data, isLoading, refetch } = useQuery({
        queryKey: ["residentWallet"],
        queryFn: ({ signal }) => getResidentWallet({ signal }),
        refetchOnMount: true,
        staleTime: 0,
    });

    return { data, isLoading, refetch };
};
