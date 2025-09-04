import { Modal, ModalContent, ModalBody, Button, useDisclosure } from "@heroui/react";

import { IonImg, IonText } from "@ionic/react";

interface AccountDialogueProps {
    modalSize: "sm" | "md" | "lg";
    modalRadius: "none" | "sm" | "md" | "lg";
    modalPlacement: "auto" | "top" | "center" | "bottom";
    buttonVariant: "solid" | "bordered" | "faded";
    buttonColor: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
    buttonRadius: "none" | "sm" | "md" | "lg";
    buttonSize: "sm" | "md" | "lg";
    buttonName: string;
    buttonVariant2: "solid" | "bordered" | "faded";
    buttonColor2: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
    buttonRadius2: "none" | "sm" | "md" | "lg";
    buttonSize2: "sm" | "md" | "lg";
    buttonName2: string;
    modalImage: string;
    message: string;
    subMessage: string;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    onOpen: () => void;
    onPress?: () => void;
}

export function AccountDialogue({
    modalSize,
    modalRadius,
    modalPlacement,
    message,
    subMessage,

    buttonName,
    buttonVariant,
    buttonColor,
    buttonRadius,
    buttonSize,

    buttonName2,
    buttonVariant2,
    buttonColor2,
    buttonRadius2,
    buttonSize2,
    modalImage,
    isOpen,
    setIsOpen,
    onOpen,
    onPress,
}: AccountDialogueProps) {
    // const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Modal
                isOpen={isOpen}
                onOpenChange={setIsOpen}
                placement={modalPlacement}
                size={modalSize}
                radius={modalRadius}
                hideCloseButton={true}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <div className="flex flex-col gap-[35px] p-[16px]">
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
                                <div className=" flex flex-col gap-[5px]">
                                    <Button
                                        onPress={onPress}
                                        className="bg-tao-primary-red text-tao-white text-[14px]"
                                        variant={buttonVariant}
                                        color={buttonColor}
                                        size={buttonSize}
                                        radius={buttonRadius}
                                        fullWidth={true}
                                        type="submit"
                                    >
                                        {buttonName}
                                    </Button>

                                    <Button
                                        onPress={onClose}
                                        className="text-tao-primary-blue text-[14px] font-[500] border-button"
                                        variant={buttonVariant2}
                                        color={buttonColor2}
                                        size={buttonSize2}
                                        radius={buttonRadius2}
                                        fullWidth={true}
                                        type="submit"
                                    >
                                        {buttonName2}
                                    </Button>
                                </div>
                            </div>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
