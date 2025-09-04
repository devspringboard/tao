import { VerifiedAccountLayout } from "../../components/Layout/VerifiedAccountLayout";
import VerifiedTabComponent from "../../components/VerifiedAccountComponent/VerifiedTabComponent";
import VerifiedAccountDetailsComponent from "../../components/VerifiedAccountComponent/VerifiedAccountDetailsComponent";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useGetResidentDetails } from "../../services/queries/residents/residentsQuery";

export default function VerifiedDocuments() {
    const user = useSelector((state: RootState) => state.auth.user);

    const { data, refetch: refetchPersonalInfo } = useGetResidentDetails({
        id: user?.id as number,
    });

    const extractDocuments = (profile: any) => ({
        id_type: profile?.id_type ?? "-",
        front_id: profile?.front_id ?? "-",
        back_id: profile?.back_id ?? "-",
        selfie: profile?.selfie_verification ?? "-",
    });

    const documents = extractDocuments(data?.resident_profile_verification);

    return (
        <VerifiedAccountLayout>
            <div className="container mx-auto flex flex-col items-start gap-[35px] self-stretch">
                <VerifiedTabComponent
                    documentsTabName="Documents"
                    documentsTabImg="/assets/images/verifiedTabIcon/Folder OpenActive.svg"
                    selectedTab="documents"
                />
                <div className="flex flex-col gap-[15px] items-start self-stretch">
                    <VerifiedAccountDetailsComponent title="ID Type" content={documents.id_type} />

                    <VerifiedAccountDetailsComponent
                        title="Front"
                        imageID={`${import.meta.env.VITE_TAO_ASSETS_BASE_URL}/${
                            documents.front_id
                        }`}
                    />

                    <VerifiedAccountDetailsComponent
                        title="Back"
                        imageID={`${import.meta.env.VITE_TAO_ASSETS_BASE_URL}/${documents.back_id}`}
                    />

                    <VerifiedAccountDetailsComponent
                        title="Selfie"
                        imageID={`${import.meta.env.VITE_TAO_ASSETS_BASE_URL}/${documents.selfie}`}
                    />
                </div>
            </div>
        </VerifiedAccountLayout>
    );
}
