import { IonImg } from "@ionic/react";
import { useHistory } from "react-router";

interface VerifiedTabComponentProps {
    personalDetailsTabName?: string;
    personalDetailsTabImg?: string;
    contactsTabName?: string;
    contactsTabImg?: string;
    governmentProgramsTabName?: string;
    governmentProgramsTabImg?: string;
    documentsTabName?: string;
    documentsTabImg?: string;
    selectedTab: "personalDetails" | "contactsAddress" | "governmentPrograms" | "documents";
}

export default function VerifiedTabComponent({
    personalDetailsTabName,
    personalDetailsTabImg,
    contactsTabName,
    contactsTabImg,
    governmentProgramsTabName,
    governmentProgramsTabImg,
    documentsTabName,
    documentsTabImg,
    selectedTab,
}: VerifiedTabComponentProps) {
    const history = useHistory();

    return (
        <>
            <div className="flex justify-between items-starts self-stretch">
                {/* Personal Details Tab */}
                <div>
                    {selectedTab === "personalDetails" ? (
                        <div className="flex justify-between items-starts self-stretch">
                            <div className="flex pb-[10px] items-center gap-[10px] border-b-1 border-tao-primary-blue">
                                <IonImg src={personalDetailsTabImg} alt={personalDetailsTabImg} />
                                <h1 className="text-[18px] font-[700] text-tao-primary-blue">
                                    {personalDetailsTabName}
                                </h1>
                            </div>
                        </div>
                    ) : (
                        <IonImg
                            src="/assets/images/verifiedTabIcon/User.svg"
                            onClick={() => {
                                history.push("/resident-details");
                            }}
                        />
                    )}
                </div>

                {/* Contacts Tab */}
                <div>
                    {selectedTab === "contactsAddress" ? (
                        <div className="flex justify-between items-starts self-stretch">
                            <div className="flex pb-[10px] items-center gap-[10px] border-b-1 border-tao-primary-blue">
                                <IonImg src={contactsTabImg} alt={contactsTabImg} />
                                <h1 className="text-[18px] font-[700] text-tao-primary-blue">
                                    {contactsTabName}
                                </h1>
                            </div>
                        </div>
                    ) : (
                        <IonImg
                            src="/assets/images/verifiedTabIcon/Phone.svg"
                            onClick={() => {
                                history.push("/contact-details");
                            }}
                        />
                    )}
                </div>

                {/* Government Programs Tab */}
                <div>
                    {selectedTab === "governmentPrograms" ? (
                        <div className="flex justify-between items-starts self-stretch">
                            <div className="flex pb-[10px] items-center gap-[10px] border-b-1 border-tao-primary-blue">
                                <IonImg
                                    src={governmentProgramsTabImg}
                                    alt={governmentProgramsTabImg}
                                />
                                <h1 className="text-[18px] font-[700] text-tao-primary-blue">
                                    {governmentProgramsTabName}
                                </h1>
                            </div>
                        </div>
                    ) : (
                        <IonImg
                            src="/assets/images/verifiedTabIcon/Buildings.svg"
                            onClick={() => {
                                history.push("/government-details");
                            }}
                        />
                    )}
                </div>

                {/* Documents Tab */}
                <div>
                    {selectedTab === "documents" ? (
                        <div className="flex justify-between items-starts self-stretch">
                            <div className="flex pb-[10px] items-center gap-[10px] border-b-1 border-tao-primary-blue">
                                <IonImg src={documentsTabImg} alt={documentsTabImg} />
                                <h1 className="text-[18px] font-[700] text-tao-primary-blue">
                                    {documentsTabName}
                                </h1>
                            </div>
                        </div>
                    ) : (
                        <IonImg
                            src="/assets/images/verifiedTabIcon/Folder Open.svg"
                            onClick={() => {
                                history.push("/uploaded-documents");
                            }}
                        />
                    )}
                </div>
            </div>
        </>
    );
}
