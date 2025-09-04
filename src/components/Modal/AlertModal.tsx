import { Button } from "@heroui/button";
import { Modal, ModalBody, ModalContent } from "@heroui/modal";
import { FiAlertTriangle } from "react-icons/fi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

interface AlertModalProps {
    title: string;
    type: "success" | "error" | "info";
    message: string;
    withConfirm?: boolean;
    onConfirm?: () => void;
    onCancel?: () => void;
    buttonText?: string;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const AlertModal = ({
    title,
    type,
    message,
    withConfirm,
    onConfirm,
    onCancel,
    buttonText,
    isOpen,
    setIsOpen,
}: AlertModalProps) => {
    const handleClose = () => {
        setIsOpen(false);
        onCancel?.();
    };

    return (
        <Modal
            isOpen={isOpen}
            size="xs"
            onClose={handleClose}
            placement="center"
            hideCloseButton={true}
        >
            <ModalContent>
                <ModalBody>
                    <div className="flex flex-col justify-center items-center py-3">
                        {type === "success" ? (
                            <IoMdCheckmarkCircleOutline
                                size={50}
                                className="text-tao-success-900 mb-5"
                            />
                        ) : (
                            <FiAlertTriangle size={50} className="text-tao-primary-red mb-5" />
                        )}

                        <div className="flex flex-col text-center mb-7">
                            <h3 className="text-tao-primary-blue text-lg font-bold">{title}</h3>
                            <p className="text-tao-primary-blue text-xs">{message}</p>
                        </div>

                        <div className="flex gap-2 w-full">
                            {withConfirm && (
                                <>
                                    <Button
                                        className="bg-tao-primary-red font-bold text-tao-white"
                                        size="md"
                                        variant="solid"
                                        radius="md"
                                        fullWidth={true}
                                        onPress={onConfirm}
                                    >
                                        {buttonText}
                                    </Button>

                                    {type !== "success" && (
                                        <Button
                                            className="font-bold border-button"
                                            size="md"
                                            variant="bordered"
                                            radius="md"
                                            fullWidth={true}
                                            onPress={handleClose}
                                        >
                                            Cancel
                                        </Button>
                                    )}
                                </>
                            )}

                            {!withConfirm && (
                                <Button
                                    className={`${
                                        type === "success"
                                            ? "bg-tao-success-900"
                                            : "bg-tao-primary-red"
                                    } font-bold text-tao-white`}
                                    size="md"
                                    variant="solid"
                                    radius="md"
                                    fullWidth={true}
                                    onPress={handleClose}
                                >
                                    {buttonText}
                                </Button>
                            )}
                        </div>
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default AlertModal;
