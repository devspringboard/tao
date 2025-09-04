import { Modal, ModalContent, ModalBody, Button, useDisclosure } from "@heroui/react";

import { IonImg, IonText } from "@ionic/react";
import { SolidButtonComponent } from "../SolidButtonComponent";

interface OnProcessApplicationProps {
    modalSize: "sm" | "md" | "lg";
    modalRadius: "none" | "sm" | "md" | "lg";
    modalPlacement: "auto" | "top" | "center" | "bottom";
    message: string;
    subMessage: string;
    modalImage: string;
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
}

export function OnProcessApplication({
    modalSize,
    modalRadius,
    modalPlacement,
    modalImage,
    message,
    subMessage,
    isOpen,
    onOpenChange,
}: OnProcessApplicationProps) {
    return (
        <>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement={modalPlacement}
                size={modalSize}
                radius={modalRadius}
                hideCloseButton={true}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <div className="flex flex-col gap-[10px] p-[16px]">
                                <ModalBody>
                                    <div className="flex flex-col gap-[15px]">
                                        <IonImg src={modalImage}></IonImg>
                                        <IonText className="text-center">
                                            <h1 className="text-tao-charcoal-900 text-[14px] font-[700]">
                                                {message}
                                            </h1>
                                            <p className="text-[12px] text-tao-charcoal-300">
                                                {subMessage}
                                            </p>
                                        </IonText>
                                    </div>
                                </ModalBody>
                                <div className=" flex flex-col gap-[5px]"></div>

                                <div>
                                    <SolidButtonComponent
                                        radius="md"
                                        variant="solid"
                                        color="default"
                                        size="md"
                                        buttonName="Okay"
                                        fullWidth={true}
                                        customColor="tao-primary-red"
                                        onPress={onClose}
                                        isPrimaryRed={true}
                                    />
                                </div>
                            </div>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
