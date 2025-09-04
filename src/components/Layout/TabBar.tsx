import { IonTabButton, IonTabBar, IonLabel, IonIcon } from "@ionic/react";

import { useHistory, useLocation } from "react-router";
import { AccountDialogue } from "../Modal/AccountDialogue";
import { useDisclosure } from "@heroui/modal";
import { UserProps } from "../../types/appTypes";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { OnProcessApplication } from "../Modal/OnProcessApplication";

export default function TabBar() {
    const location = useLocation();
    const pathname = location.pathname;

    const disclosures = {
        account: useDisclosure(),
        onProcessApplication: useDisclosure(),
    };

    const history = useHistory();

    const { is_verified } = useSelector((state: RootState) => state.auth.user) as UserProps;

    const isVerificationScreen = [
        "/account-verification",
        "/contact-address",
        "/personal-details",
        "/government-programs",
        "/identity-verification",
        "/login",
        "/signup",
        "/verify-otp",
        "/application-submitted",
        "/assistance-documents",
        "/supporting-documents",
    ].some((path) => location.pathname.includes(path));

    const getDisclosureAction = (tab: string) => {
        const isTabRestricted = tab === "qr" || tab === "inbox";

        if (!is_verified && isTabRestricted) {
            return disclosures.account.onOpen;
        }

        if (is_verified === 2 && isTabRestricted) {
            return disclosures.onProcessApplication.onOpen;
        }

        return undefined;
    };

    const getTabButtonProps = (tab: string, href: string) => {
        const isDisabled = (!is_verified || is_verified === 2) && (tab === "qr" || tab === "inbox");

        return {
            href: isDisabled ? "#" : href,
            onClick: getDisclosureAction(tab),
        };
    };

    const renderTabButton = (
        tab: string,
        href: string,
        iconFill: string,
        iconOutline: string,
        label: string
    ) => {
        const { href: buttonHref, onClick } = getTabButtonProps(tab, href);
        return (
            <IonTabButton tab={tab} href={buttonHref} onClick={onClick}>
                <IonIcon src={pathname === href ? iconFill : iconOutline} />
                <IonLabel className="text-[11px] text-tao-charcoal-500">{label}</IonLabel>
            </IonTabButton>
        );
    };

    return (
        <>
            {!isVerificationScreen && (
                <IonTabBar
                    slot="bottom"
                    className="pt-3 shadow-l border-t-1 border-tao-charcoal-100"
                    style={{ boxShadow: "0px 1px 4px 0px rgba(0, 0, 0, 0.15)" }}
                >
                    {renderTabButton(
                        "home",
                        "/dashboard",
                        "/assets/images/Icons/HomeFill.svg",
                        "/assets/images/Icons/Home.svg",
                        "Home"
                    )}
                    {renderTabButton(
                        "account",
                        "/profile",
                        "/assets/images/Icons/UserFill.svg",
                        "/assets/images/Icons/User.svg",
                        "Profile"
                    )}
                    {renderTabButton(
                        "qr",
                        "/my-qr",
                        "/assets/images/Icons/QRFill.svg",
                        "/assets/images/Icons/QR Code.svg",
                        "My QR"
                    )}
                    {renderTabButton(
                        "inbox",
                        "/inbox",
                        "/assets/images/Icons/MailboxFill.svg",
                        "/assets/images/Icons/Mailbox.svg",
                        "Inbox"
                    )}
                </IonTabBar>
            )}

            <AccountDialogue
                modalSize="sm"
                modalRadius="sm"
                modalPlacement="center"
                buttonVariant="solid"
                buttonColor="primary"
                buttonRadius="sm"
                buttonSize="sm"
                buttonName="Verify Now"
                buttonVariant2="bordered"
                buttonColor2="primary"
                buttonRadius2="sm"
                buttonSize2="sm"
                buttonName2="No Thanks"
                modalImage="assets/images/Something-Went-Wrong.svg"
                message="Verify your account to enjoy premium features"
                subMessage="Verify your account to enjoy premium features"
                isOpen={disclosures.account.isOpen}
                setIsOpen={disclosures.account.onOpenChange}
                onOpen={disclosures.account.onOpen}
                onPress={() => {
                    history.push("/account-verification");
                }}
            />

            <OnProcessApplication
                modalSize="sm"
                modalRadius="sm"
                modalPlacement="center"
                message="Your application is still on process"
                subMessage="Your account is still being processed for verification."
                modalImage="assets/images/Waiting.svg"
                isOpen={disclosures.onProcessApplication.isOpen}
                onOpenChange={disclosures.onProcessApplication.onOpenChange}
            />
        </>
    );
}
