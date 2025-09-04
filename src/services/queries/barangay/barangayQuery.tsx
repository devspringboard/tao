import { useQuery } from "@tanstack/react-query";
import { getBarangays } from "../../api/barangay/api";

export const useGetBarangays = () => {
    const { data, isLoading, refetch } = useQuery({
        queryKey: ["barangay"],
        queryFn: ({ signal }) => getBarangays({ signal }),
    });

    const barangayOptions = data?.map((item: any) => ({
        label: item.full_address,
        value: item.id,
    }));

    return {
        data,
        isLoading,
        refetch,
        barangayOptions,
    };
};
