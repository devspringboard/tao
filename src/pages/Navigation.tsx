import { IonImg } from "@ionic/react";
import { PageLayout } from "../components/PageLayout";
import { NavLinkComponent } from "../components/NavLinkComponent";

export default function Navigation() {
    return (
        <PageLayout pageStyle="ion-padding">
            <div className="container mx-auto py-[40px] flex flex-col w-[389] items-end gap-[50px]">
                <IonImg
                    className="w-[32px] h-[32px] shrink-0"
                    src="/assets/images/Icons/Hamburger Menu.svg"
                ></IonImg>
            </div>
            <div className="flex flex-col items-start gap-[50px] self-stretch">
                <IonImg src="/assets/images/tao-logo.png"></IonImg>

                <div className="flex flex-col gap-[20px] self-stretch">
                    <NavLinkComponent navTitle="Home" navIcon="/assets/images/Icons/Home.svg" />

                    <NavLinkComponent
                        navTitle="My Account"
                        navIcon="/assets/images/Icons/User.svg"
                    />

                    <NavLinkComponent navTitle="My QR" navIcon="/assets/images/Icons/QR Code.svg" />

                    <NavLinkComponent navTitle="Inbox" navIcon="/assets/images/Icons/Mailbox.svg" />
                </div>
            </div>
        </PageLayout>
    );
}
