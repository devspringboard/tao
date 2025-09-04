import { VerifiedAccountLayout } from "../../components/Layout/VerifiedAccountLayout";
import VerifiedTabComponent from "../../components/VerifiedAccountComponent/VerifiedTabComponent";
import VerifiedAccountDetailsComponent from "../../components/VerifiedAccountComponent/VerifiedAccountDetailsComponent";
import { PersonalDetailsSchemaType } from "../../validations/profileVerificationSchema";
import { useGetResidentDetails } from "../../services/queries/residents/residentsQuery";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export default function VerifiedContacts() {
    const user = useSelector((state: RootState) => state.auth.user);
    const { data } = useGetResidentDetails({ id: user?.id as number });

    const extractContactAddress = (contactAddress: any) => ({
        street: contactAddress?.resident_personal_details?.street_details ?? "-",
        email_address: contactAddress?.email ?? "-",
        barangay: contactAddress?.barangay.barangay ?? "-",
        city: contactAddress?.barangay.city ?? "-",
        province: contactAddress?.barangay.province ?? "-",
        country: contactAddress?.barangay.country ?? "Philippines",
        mobile_number: contactAddress?.resident_personal_details?.mobile_no ?? "-",
        postal_code: contactAddress?.barangay.postal_code ?? "-",
        telephone_number: contactAddress?.resident_personal_details?.telephone_no ?? "-",
    });

    const contactAddress = extractContactAddress(data);

    return (
        <VerifiedAccountLayout>
            <div className="container mx-auto flex flex-col items-start gap-[35px] self-stretch">
                <VerifiedTabComponent
                    contactsTabName="Contacts & Address"
                    contactsTabImg="/assets/images/verifiedTabIcon/PhoneActive.svg"
                    selectedTab="contactsAddress"
                />
                <div className="flex flex-col gap-[15px] items-start self-stretch">
                    <VerifiedAccountDetailsComponent
                        title="Street Name, Building, House No."
                        content={contactAddress.street}
                    />

                    <VerifiedAccountDetailsComponent
                        title="Barangay"
                        content={contactAddress.barangay}
                    />

                    <VerifiedAccountDetailsComponent title="City" content={contactAddress.city} />

                    <VerifiedAccountDetailsComponent
                        title="Province"
                        content={contactAddress.province}
                    />

                    <VerifiedAccountDetailsComponent
                        title="Country"
                        content={contactAddress.country}
                    />

                    <VerifiedAccountDetailsComponent
                        title="Postal Code"
                        content={contactAddress.postal_code}
                    />

                    <VerifiedAccountDetailsComponent
                        title="Email Address"
                        content={contactAddress.email_address}
                    />

                    <VerifiedAccountDetailsComponent
                        title="Mobile Number"
                        content={contactAddress.mobile_number}
                    />

                    <VerifiedAccountDetailsComponent
                        title="Telephone Number"
                        content={contactAddress.telephone_number}
                    />
                </div>
            </div>
        </VerifiedAccountLayout>
    );
}
