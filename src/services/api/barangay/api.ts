import axiosClient from "../axios";

export const getBarangays = async ({ signal }: { signal?: AbortSignal }) => {
  const response = await axiosClient.get("/barangay", {signal});
  return response.data;
};
