import axiosClient from "../axios";
import { CreateProfileProps, UpdateUserVerificationProps } from "../../../types/appTypes";
import { blobUrlToFileList } from "../../../utils/imgUtil";
export const getCivilStatus = async ({ signal }: { signal?: AbortSignal }) => {
    const response = await axiosClient.get("/civil-status", { signal });
    return response.data;
};

export const getReligions = async ({ signal }: { signal?: AbortSignal }) => {
    const response = await axiosClient.get("/religions", { signal });
    return response.data;
};

export const getGender = async ({ signal }: { signal?: AbortSignal }) => {
    const response = await axiosClient.get("/genders", { signal });
    return response.data;
};

export const getResidentProfile = async ({ id, signal }: { id: number; signal?: AbortSignal }) => {
    const response = await axiosClient.get(`/residents/profile/${id}`, { signal });
    return response.data;
};

export const getAcceptingIds = async ({ signal }: { signal?: AbortSignal }) => {
    const response = await axiosClient.get("/residents/acceptingIds", { signal });
    return response.data;
};

export const createProfile = async (data: CreateProfileProps, signal?: AbortSignal) => {
    const { personalDetails, contactAddress, governmentPrograms, identityVerification, userId } =
        data;

    const [frontId, backId, selfieVerification] = await Promise.all([
        blobUrlToFileList(identityVerification.id_front_image),
        blobUrlToFileList(identityVerification.id_back_image),
        blobUrlToFileList(identityVerification.id_selfie_image),
    ]);

    const newPayload = {
        first_name: personalDetails.first_name,
        middle_name: personalDetails.middle_name,
        last_name: personalDetails.last_name,
        suffix: personalDetails.suffix,
        sex: personalDetails.sex,
        email: contactAddress.email_address,
        mobile_no: contactAddress.mobile_number,
        tel_no: contactAddress.telephone_number,
        street_details: contactAddress.street,
        birth_date: personalDetails.birth_date,
        birth_place: personalDetails.birth_place,
        nationality: personalDetails.nationality,
        religion_id: personalDetails.religion,
        civil_status_id: personalDetails.civil_status,
        occupation: personalDetails.occupation,
        pwd_id_no: governmentPrograms.pwd_id_no,
        senior_citizen_id_no: governmentPrograms.senior_citizen_id_no,
        no_of_dependents: governmentPrograms.no_of_dependents,
        id_type: identityVerification.id_type,
        front_id: frontId?.[0],
        back_id: backId?.[0],
        selfie_verification: selfieVerification?.[0],
    };

    const formData = new FormData();
    Object.entries(newPayload).forEach(([key, value]) => {
        formData.append(key, value as string);
    });

    const response = await axiosClient.post(
        `/residents/profile/create-profile/${userId}`,
        formData,
        {
            signal,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;
};

export const getVerificationStatus = async ({
    id,
    signal,
}: {
    id: number;
    signal?: AbortSignal;
}) => {
    const response = await axiosClient.get(`/residents/profile/verification-status/${id}`, {
        signal,
    });
    return response.data;
};

export const updateUserVerification = async (
    data: UpdateUserVerificationProps,
    signal?: AbortSignal
) => {
    const response = await axiosClient.put(
        `/residents/profile/${data.id}/update-verification-status/`,
        data,
        {
            signal,
        }
    );
    return response.data;
};
