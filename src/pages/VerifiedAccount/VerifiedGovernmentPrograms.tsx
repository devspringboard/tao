import { VerifiedAccountLayout } from "../../components/Layout/VerifiedAccountLayout";
import VerifiedTabComponent from "../../components/VerifiedAccountComponent/VerifiedTabComponent";
import VerifiedAccountDetailsComponent from "../../components/VerifiedAccountComponent/VerifiedAccountDetailsComponent";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useGetResidentDetails } from "../../services/queries/residents/residentsQuery";
import { GovernmentProgramsSchemaType } from "../../validations/profileVerificationSchema";

export default function VerifiedContacts() {
    const user = useSelector((state: RootState) => state.auth.user);
    const { data } = useGetResidentDetails({ id: user?.id as number });

    const extractGovernmentPrograms = (profile: GovernmentProgramsSchemaType) => ({
        pwd_id_no: profile?.pwd_id_no ?? "-",
        no_of_dependents: profile?.no_of_dependents ?? "-",
        senior_citizen_id_no: profile?.senior_citizen_id_no ?? "-",
    });

    const governmentPrograms = extractGovernmentPrograms(data?.resident_personal_details);

    return (
        <VerifiedAccountLayout>
            <div className="container mx-auto flex flex-col items-start gap-[35px] self-stretch">
                <VerifiedTabComponent
                    governmentProgramsTabName="Government Programs"
                    governmentProgramsTabImg="/assets/images/verifiedTabIcon/BuildingsActive.svg"
                    selectedTab="governmentPrograms"
                />
                <div className="flex flex-col gap-[15px] items-start self-stretch">
                    <VerifiedAccountDetailsComponent
                        title="PWD ID No."
                        content={governmentPrograms.pwd_id_no}
                    />

                    <VerifiedAccountDetailsComponent
                        title="No. of Dependents"
                        content={governmentPrograms.no_of_dependents}
                    />

                    <VerifiedAccountDetailsComponent
                        title="Senior Citizen ID No."
                        content={governmentPrograms.senior_citizen_id_no}
                    />
                </div>
            </div>
        </VerifiedAccountLayout>
    );
}
