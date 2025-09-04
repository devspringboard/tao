import { IonImg } from "@ionic/react";
import { TaoLayout } from "../../components/Layout/TaoLayout";
import { Button } from "@heroui/button";
import { useHistory } from "react-router-dom";
import {
    setContactAddress,
    setPersonalDetails,
    setGovernmentPrograms,
    setIdentityVerification,
} from "../../redux/reducers/verificationSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useGetResidentProfile } from "../../services/queries/profile-verification/profileVerificationQuery";
import { RootState } from "../../redux/store";
import { UserProps } from "@heroui/react";
import {
    GovernmentProgramsSchemaType,
    PersonalDetailsSchemaType,
} from "../../validations/profileVerificationSchema";

export default function AccountVerification() {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.auth.user) as UserProps | null;

    const {
        data: residentProfile,
        isLoading: isLoadingResidentProfile,
        refetch: refetchResidentProfile,
    } = useGetResidentProfile({
        id: Number(user?.id),
    });

    const extractPersonalDetails = (profile: PersonalDetailsSchemaType) => ({
        first_name: profile?.first_name ?? "",
        middle_name: profile?.middle_name ?? "",
        last_name: profile?.last_name ?? "",
        suffix: profile?.suffix ?? "",
        sex: profile?.sex ?? "",
        birth_date: profile?.birth_date ?? "",
        birth_place: profile?.birth_place ?? "",
        nationality: profile?.nationality ?? "Filipino",
        civil_status: profile?.civil_status ?? "",
        religion: profile?.religion ?? "",
        occupation: profile?.occupation ?? "",
    });

    const extractGovernmentPrograms = (profile: GovernmentProgramsSchemaType) => ({
        is_pwd: profile?.pwd_id_no ? true : false,
        is_single_parent: profile?.no_of_dependents ? true : false,
        is_senior_citizen: profile?.senior_citizen_id_no ? true : false,
        pwd_id_no: profile?.pwd_id_no ?? "",
        no_of_dependents: profile?.no_of_dependents ?? "",
        senior_citizen_id_no: profile?.senior_citizen_id_no ?? "",
    });

    const extractContactAddress = (profile: any) => ({
        street: profile?.resident_personal_details?.street_details ?? "",
        email_address: profile?.email ?? "",
        barangay: profile?.barangay.barangay ?? "",
        city: profile?.barangay.city ?? "",
        province: profile?.barangay.province ?? "",
        country: profile?.barangay.country ?? "Philippines",
        mobile_number: profile?.resident_personal_details?.mobile_no ?? "",
    });

    const personalDetails = extractPersonalDetails(residentProfile?.resident_personal_details);
    const governmentPrograms = extractGovernmentPrograms(
        residentProfile?.resident_personal_details
    );
    const contactAddress = extractContactAddress(residentProfile);

    const handleProfileVerification = () => {
        dispatch(setPersonalDetails(personalDetails));
        dispatch(setGovernmentPrograms(governmentPrograms));
        dispatch(setContactAddress(contactAddress));
        history.push("/personal-details");
    };

    useEffect(() => {
        const resetVerificationData = () => {
            dispatch(setPersonalDetails(null));
            dispatch(setContactAddress(null));
            dispatch(setGovernmentPrograms(null));
            dispatch(setIdentityVerification(null));
        };
        resetVerificationData();
        refetchResidentProfile();
    }, []);

    return (
        <TaoLayout>
            <div className="container flex flex-col items-center px-[16px] py-[13px] mx-auto">
                <h1 className="text-tao-charcoal-900 text-[24px] font-[500] self-stretch">
                    Account Verification
                </h1>

                <div className="flex flex-col gap-[20px]">
                    <div className="flex flex-col py-[100px] items-center justify-center gap-[5px] w-[358px]">
                        <IonImg src="/assets/images/Cybersecurity 1.svg"></IonImg>
                        <h1 className="text-tao-charcoal-900 text-[24px] font-[700]">
                            Your Information Is Secure
                        </h1>
                        <p className="text-[14px] text-tao-charcoal-300 text-center self-stretch font-[400]">
                            We take your privacy seriously. The details you provide will be kept
                            secure and used only for official purposes.
                        </p>
                    </div>
                </div>
                <form className="self-stretch">
                    <div className="pt-[180px] text-center flex flex-col gap-[10px]">
                        <Button
                            className="bg-tao-primary-blue text-tao-white"
                            radius="md"
                            variant="solid"
                            size="md"
                            color="default"
                            fullWidth={true}
                            onPress={handleProfileVerification}
                        >
                            Let's get started
                        </Button>
                        <p className="text-tao-charcoal-300 text-[12px]">
                            Read
                            <span className="text-tao-primary-red font-[500]">
                                {" "}
                                Terms of Service
                            </span>{" "}
                            and{" "}
                            <span className="text-tao-primary-red font-[500]"> Privacy Policy</span>
                        </p>
                    </div>
                </form>
            </div>
        </TaoLayout>
    );
}
