import { Chip } from "@heroui/chip";
import { IonImg } from "@ionic/react";
import { useHistory } from "react-router-dom";
import { ComingSoon } from "../Modal/ComingSoon";
import { useDisclosure } from "@heroui/modal";
import { StatusBar } from "@capacitor/status-bar";
import { useEffect } from "react";
import { EdgeToEdge } from "@capawesome/capacitor-android-edge-to-edge-support";
import { Capacitor } from "@capacitor/core";

export default function TopBar() {
    const history = useHistory();
    const {
        isOpen: isComingSoon,
        onOpen: onComingSoon,
        onOpenChange: onComingSoonChange,
    } = useDisclosure();

    useEffect(() => {
        if (Capacitor.getPlatform() !== "web") {
            StatusBar.setOverlaysWebView({ overlay: false });
            StatusBar.setBackgroundColor({ color: "#ffffff" });
            EdgeToEdge.setBackgroundColor({ color: "#ffffff" });
        }
    }, []);

    return (
        <>
            <div className="flex p-[16px] justify-between items-center">
                <div className="flex justify-between w-full items-center">
                    <IonImg
                        src="/assets/images/tao-logo.png"
                        className="w-[73px] h-[55px]"
                        onClick={() => {
                            history.push("/dashboard");
                        }}
                    ></IonImg>

                    <Chip
                        variant="faded"
                        size="sm"
                        radius="full"
                        startContent={
                            <IonImg src="/assets/images/Icons/HelpIcon.svg" className="pr-1" />
                        }
                        classNames={{
                            base: "bg-tao-info-900 text-tao-white border-tao-info-900",
                        }}
                        onClick={() => {
                            onComingSoon();
                        }}
                    >
                        Help
                    </Chip>
                </div>
            </div>

            {/* Coming Soon Modal */}
            <ComingSoon
                modalSize="sm"
                modalRadius="sm"
                modalPlacement="center"
                message="Sorry! We're still working on this"
                subMessage="This feature isn't available yet, but it's on the way."
                modalImage="assets/images/Under-Construction.svg"
                isOpen={isComingSoon}
                onOpenChange={onComingSoonChange}
            />
        </>
    );
}
