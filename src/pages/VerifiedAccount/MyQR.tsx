import { Image } from "@heroui/image";
import { TaoLayout } from "../../components/Layout/TaoLayout";
import { IonImg } from "@ionic/react";
import { SolidButtonComponent } from "../../components/SolidButtonComponent";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { UserProps } from "../../types/appTypes";
import { useGetResidentDetails } from "../../services/queries/residents/residentsQuery";
import { QRCode } from "react-qrcode-logo";
import { useMemo } from "react";

export default function MyQR() {
    const user = useSelector((state: RootState) => state.auth.user) as UserProps;
    const { data, isLoading } = useGetResidentDetails({
        id: user?.id as number,
    });

    const extractDocuments = (profile: any = {}) => ({
        selfie: `${import.meta.env.VITE_TAO_ASSETS_BASE_URL}/${profile?.selfie_verification}`,
    });

    const documents = useMemo(
        () => extractDocuments(data?.resident_profile_verification || {}),
        [data]
    );

    return (
        <TaoLayout cssStyle={{ "--overflow": "hidden" }}>
            <div
                className="bg-cover bg-center h-full pt-5"
                style={{ backgroundImage: "url('/assets/images/qrBG.png')" }}
            >
                <div className="container flex flex-col items-center gap-y-[50px] flex-shrink-0 w-[296px] mx-auto scroll-pt-14">
                    <div className="flex flex-col gap-[20px] items-center">
                        <Image
                            sizes="lg"
                            radius="full"
                            src={!isLoading ? documents.selfie : "/assets/images/profile.svg"}
                            className="border-2 border-brand-secondary"
                            width={70}
                            height={70}
                        />
                        <div className="flex flex-col gap-[10px] items-center text-center">
                            <h1 className="text-[18px] font-[700] text-tao-primary-blue">
                                {user?.full_name}
                                <p className="font-[400] text-[14px] text-tao-charcoal-300">
                                    {user?.email}
                                </p>
                            </h1>
                        </div>
                    </div>

                    <div className="flex flex-col items-center gap-[10px] self-stretch">
                        <div className="border-1 p-5 rounded-[32px] shadow-sm">
                            <QRCode
                                size={256}
                                logoImage="/assets/images/tao-logo.png"
                                logoWidth={43}
                                logoHeight={32}
                                quietZone={10}
                                removeQrCodeBehindLogo={true}
                                value="https://springboard.com.ph/"
                            />
                        </div>
                        <h1 className="text-[14px] font-[400] text-tao-charcoal-300">
                            ID: TAO-0125-2A193D6
                        </h1>
                    </div>

                    <div className="flex self-stretch">
                        <SolidButtonComponent
                            radius="md"
                            variant="solid"
                            color="default"
                            size="md"
                            buttonName="Download QR"
                            fullWidth={true}
                            customColor="tao-primary-blue"
                            type="submit"
                            buttonImg="/assets/images/DownloadQR.svg"
                        />
                    </div>
                </div>
            </div>
        </TaoLayout>
    );
}
