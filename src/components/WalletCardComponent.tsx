import { IonImg } from "@ionic/react";
import { SolidButtonComponent } from "./SolidButtonComponent";
import { useState } from "react";
import { useGetResidentWallet } from "../services/queries/residents/residentsQuery";

export default function WalletCardComponent() {
    const [isVisible, setIsVisible] = useState(false);
    const { data, isLoading } = useGetResidentWallet();

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    return (
        <div className="bg-wallet-card self-stretch flex flex-col">
            <div className="flex items-center gap-[10.376px]">
                <IonImg src="/assets/images/rewards.svg"></IonImg>
                <h1 className="text-[14.526px] text-tao-white">Rewards</h1>

                <div className="ml-auto">
                    <SolidButtonComponent
                        radius="md"
                        variant="solid"
                        color="default"
                        size="md"
                        buttonName="Cashout"
                        fullWidth={false}
                        customColor="tao-primary-red"
                        isPrimaryRed={true}
                    />
                </div>
            </div>
            <div className="flex justify-between self-stretch mt-auto">
                <h1 className="text-[33.202px] font-[700] text-tao-white">
                    {isVisible && !isLoading
                        ? new Intl.NumberFormat("en-US", {
                              style: "decimal",
                              minimumFractionDigits: 2,
                          }).format(data?.credits ?? 0)
                        : "*******"}
                </h1>
                <button onClick={toggleVisibility}>
                    {isVisible ? <IonImg src="/assets/images/Eye.svg"></IonImg> : <IonImg src="/assets/images/Eye Closed.svg"></IonImg>}
                </button>
            </div>
        </div>
    );
}
