import { useSelector } from "react-redux";
import { WidgetComponent } from "./WidgetComponent";
import { RootState } from "../../redux/store";
import { UserProps } from "../../types/appTypes";
import { AccountDialogue } from "../Modal/AccountDialogue";
import { useDisclosure } from "@heroui/modal";
import { ComingSoon } from "../Modal/ComingSoon";
import { useHistory } from "react-router";
import { OnProcessApplication } from "../Modal/OnProcessApplication";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function DashboardWidget() {
    const { is_verified } = useSelector((state: RootState) => state.auth.user) as UserProps;
    const history = useHistory();
    const [seeMore, setSeeMore] = useState(false);

    const disclosures = {
        account: useDisclosure(),
        comingSoon: useDisclosure(),
        onProcessApplication: useDisclosure(),
        rejectApplication: useDisclosure(),
    };

    const checkIfVerified = (link: string) => {
        if (!is_verified) {
            return disclosures.account.onOpen();
        }

        if (is_verified === 2) {
            return disclosures.onProcessApplication.onOpen();
        }

        if (is_verified === 3) {
            return disclosures.rejectApplication.onOpen();
        }

        return history.push(link);
    };

    const comingSoon = () => {
        disclosures.comingSoon.onOpen();
    };

    return (
        <>
            <div className="grid grid-cols-3 lg:grid-cols-6">
                <WidgetComponent widgetIcon="assets/images/Icons/Widgets/QR Code.svg" widgetTitle="My QR" onClick={() => checkIfVerified("/my-qr")} />

                <WidgetComponent
                    widgetIcon="assets/images/Icons/Widgets/Hand Heart.svg"
                    widgetTitle="Ayuda"
                    onClick={() => checkIfVerified("/financial-assistance")}
                />

                <WidgetComponent widgetIcon="assets/images/Icons/Widgets/Siren.svg" widgetTitle="SOS" onClick={comingSoon} />

                <WidgetComponent widgetIcon="assets/images/Icons/Widgets/Jobs.svg" widgetTitle="Jobs" onClick={comingSoon} />

                <WidgetComponent widgetIcon="assets/images/Icons/Widgets/Loan.svg" widgetTitle="Loan" onClick={comingSoon} />

                <AnimatePresence mode="wait">
                    {seeMore ? (
                        <motion.div
                            key="expanded"
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            transition={{
                                duration: 0.4,
                                ease: "easeInOut",
                                staggerChildren: 0.1,
                            }}
                            className="contents"
                        >
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                                <WidgetComponent
                                    widgetIcon="assets/images/Icons/Widgets/Paluwagan.svg"
                                    widgetTitle="Paluwagan"
                                    onClick={comingSoon}
                                />
                            </motion.div>
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                                <WidgetComponent widgetIcon="assets/images/Icons/Widgets/Pasadax.svg" widgetTitle="Pasadax" onClick={comingSoon} />
                            </motion.div>
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                                <WidgetComponent
                                    widgetIcon="assets/images/Icons/Widgets/Tindaplus.svg"
                                    widgetTitle="TindaPlus"
                                    onClick={comingSoon}
                                />
                            </motion.div>
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                                <WidgetComponent
                                    widgetIcon="assets/images/Icons/Widgets/SeeLess.svg"
                                    widgetTitle="See Less"
                                    onClick={() => setSeeMore(false)}
                                />
                            </motion.div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="collapsed"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                            <WidgetComponent
                                widgetIcon="assets/images/Icons/Widgets/SeeMore.svg"
                                widgetTitle="See More"
                                onClick={() => setSeeMore(true)}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

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
                message="You are not verified!"
                subMessage="Verify your account to enjoy premium features"
                isOpen={disclosures.account.isOpen}
                setIsOpen={disclosures.account.onOpenChange}
                onOpen={disclosures.account.onOpen}
                onPress={() => {
                    history.push("/account-verification");
                }}
            />

            <ComingSoon
                modalSize="sm"
                modalRadius="sm"
                modalPlacement="center"
                message="Sorry! We're still working on this"
                subMessage="This feature isn't available yet, but it's on the way."
                modalImage="assets/images/Under-Construction.svg"
                isOpen={disclosures.comingSoon.isOpen}
                onOpenChange={disclosures.comingSoon.onOpenChange}
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

            <AccountDialogue
                modalSize="sm"
                modalRadius="sm"
                modalPlacement="center"
                buttonVariant="solid"
                buttonColor="primary"
                buttonRadius="sm"
                buttonSize="sm"
                buttonName="Verify Again"
                buttonVariant2="bordered"
                buttonColor2="primary"
                buttonRadius2="sm"
                buttonSize2="sm"
                buttonName2="No Thanks"
                modalImage="assets/images/Something-Went-Wrong.svg"
                message="You're not verified!"
                subMessage="Your previous application was rejected."
                isOpen={disclosures.rejectApplication.isOpen}
                setIsOpen={disclosures.rejectApplication.onOpenChange}
                onOpen={disclosures.rejectApplication.onOpen}
                onPress={() => {
                    history.push("/account-verification");
                }}
            />
        </>
    );
}
