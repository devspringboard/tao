import { IonImg } from "@ionic/react";
import { VerifiedAccountLayout } from "../../components/Layout/VerifiedAccountLayout";
import VerifiedTabComponent from "../../components/VerifiedAccountComponent/VerifiedTabComponent";
import VerifiedAccountDetailsComponent from "../../components/VerifiedAccountComponent/VerifiedAccountDetailsComponent";
import { useGetResidentDetails } from "../../services/queries/residents/residentsQuery";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { PersonalDetailsSchemaType } from "../../validations/profileVerificationSchema";
import moment from "moment";
import { capitalizeFirstLetter } from "../../utils/textUtil";
import { useEffect } from "react";
import { setPersonalDetails } from "../../redux/reducers/verificationSlice";
export default function VerifiedAccount() {
    const user = useSelector((state: RootState) => state.auth.user);

    const { data, refetch: refetchPersonalInfo } = useGetResidentDetails({
        id: user?.id as number,
    });

    const extractPersonalDetails = (profile: PersonalDetailsSchemaType) => ({
        first_name: profile?.first_name ?? "-",
        middle_name: profile?.middle_name ?? "-",
        last_name: profile?.last_name ?? "-",
        suffix: profile?.suffix ?? "-",
        sex: capitalizeFirstLetter(profile?.sex ?? "-"),
        birth_date: profile?.birth_date ?? "-",
        birth_place: profile?.birth_place ?? "-",
        nationality: profile?.nationality ?? "Filipino",
        civil_status: profile?.civil_status ?? "-",
        religion: profile?.religion ?? "-",
        occupation: profile?.occupation ?? "-",
    });

    const personalDetails = extractPersonalDetails(data?.resident_personal_details);

    useEffect(() => {
        refetchPersonalInfo();
    }, []);

    return (
        <VerifiedAccountLayout>
            <div className="container mx-auto flex flex-col items-start gap-[35px] self-stretch">
                <VerifiedTabComponent
                    personalDetailsTabName="Personal Details"
                    personalDetailsTabImg="/assets/images/verifiedTabIcon/UserActive.svg"
                    selectedTab="personalDetails"
                />
                <div className="flex flex-col gap-[15px] items-start self-stretch">
                    <VerifiedAccountDetailsComponent
                        title="First Name"
                        content={personalDetails.first_name}
                    />

                    <VerifiedAccountDetailsComponent
                        title="Middle Name"
                        content={personalDetails.middle_name}
                    />

                    <VerifiedAccountDetailsComponent
                        title="Last Name"
                        content={personalDetails.last_name}
                    />

                    <VerifiedAccountDetailsComponent
                        title="Suffix"
                        content={personalDetails.suffix}
                    />

                    <VerifiedAccountDetailsComponent title="Sex" content={personalDetails.sex} />

                    <VerifiedAccountDetailsComponent
                        title="Birthdate"
                        content={moment(personalDetails.birth_date).format("LL")}
                    />

                    <VerifiedAccountDetailsComponent
                        title="Birth Place"
                        content={personalDetails.birth_place}
                    />

                    <VerifiedAccountDetailsComponent
                        title="Nationality"
                        content={personalDetails.nationality}
                    />

                    <VerifiedAccountDetailsComponent
                        title="Religion"
                        content={personalDetails.religion}
                    />

                    <VerifiedAccountDetailsComponent
                        title="Civil Status"
                        content={personalDetails.civil_status}
                    />
                    <VerifiedAccountDetailsComponent
                        title="Occupation"
                        content={personalDetails.occupation}
                    />
                </div>
            </div>
        </VerifiedAccountLayout>
    );
}
