import { PickedFile } from "@capawesome/capacitor-file-picker";
import { InputComponent } from "../../components/InputComponent";
import { TaoLayout } from "../../components/Layout/TaoLayout";
import { useCallback, useState } from "react";
import { FileComponent } from "../../components/FileComponent";
import { SolidButtonComponent } from "../../components/SolidButtonComponent";
import { BorderedButtonComponent } from "../../components/BorderedButtonComponent";
import { useHistory, useLocation } from "react-router-dom";
import { useApplyForAssistance } from "../../services/mutation/financialAssistanceMutation";
import { useIonLoading } from "@ionic/react";
import AlertModal from "../../components/Modal/AlertModal";
import { AxiosError } from "axios";

interface LocationState {
    program_id?: number; // Define the expected structure
    program_name?: string;
}

export default function SupportingDocuments() {
    const location = useLocation<LocationState>();
    const program_id = location.state?.program_id;
    const program_name = location.state?.program_name;

    const [isOpen, setIsOpen] = useState(false);
    const [present, dismiss] = useIonLoading();
    const [alertModalProps, setAlertModalProps] = useState({
        title: "",
        message: "",
        type: "success",
        buttonText: "OK",
        withConfirm: false,
        onConfirm: () => {},
    });

    const [file, setFile] = useState<PickedFile[] | null>(null);
    const history = useHistory();

    // APPLY FOR ASSISTANCE
    const { applyForAssistanceMutation } = useApplyForAssistance();

    const handleSubmit = useCallback(async () => {
        present({
            message: "Please wait while we process your request...",
        });

        applyForAssistanceMutation(
            {
                data: {
                    program_id: program_id !== undefined ? parseInt(program_id.toString()) : 0,
                    file: file as unknown as File,
                },
            },
            {
                onSuccess: () => {
                    dismiss();
                    setIsOpen(true);

                    setAlertModalProps({
                        title: "Success",
                        message: "Request submitted successfully",
                        type: "success",
                        buttonText: "OK",
                        withConfirm: true,
                        onConfirm: () => {
                            history.push("/dashboard");
                        },
                    });
                },
                onError: (error) => {
                    const axiosError = error as AxiosError;

                    const errorMessage =
                        (axiosError.response?.data as { message?: string })?.message ||
                        "An unexpected error occurred. Please try again later.";

                    dismiss();
                    setIsOpen(true);

                    setAlertModalProps({
                        title: "Failed to submit request",
                        message: errorMessage,
                        type: "error",
                        buttonText: "OK",
                        withConfirm: false,
                        onConfirm: () => {
                            setIsOpen(false);
                        },
                    });
                },
            }
        );
    }, [file, applyForAssistanceMutation]);

    return (
        <TaoLayout>
            <div className="container mx-auto px-[16px] pt-[20px] pb-[30px] flex flex-col justify-between items-start gap-[60px] self-stretch">
                <div className="flex flex-col items-start gap-[60px] self-stretch">
                    <div className="flex flex-col items-start gap-[20px] self-stretch">
                        <h3 className="text-[18px] font-bold">Supporting Documents</h3>
                        <div className="flex flex-col items-center gap-[10px] self-stretch">
                            <InputComponent
                                label="Financial Assistance"
                                placeholder={program_name || "Financial Assistance"}
                                type="text"
                                variant="flat"
                                color="default"
                                radius="md"
                                size="md"
                                inputStyle={{
                                    label: "text-[12px]",
                                }}
                                disabled={true}
                            />

                            <div className="flex flex-col self-stretch pt-[10px] h-[487px]">
                                <FileComponent
                                    label="Upload File"
                                    setFile={setFile}
                                    file={file}
                                    key="supporting-document"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-[50px] self-stretch mt-14">
                        <BorderedButtonComponent
                            radius="md"
                            variant="solid"
                            color="default"
                            size="md"
                            buttonName="Cancel"
                            onPress={() => {
                                history.goBack();
                            }}
                        />

                        <SolidButtonComponent
                            radius="md"
                            variant="solid"
                            color="default"
                            size="md"
                            buttonName="Submit"
                            fullWidth={true}
                            customColor="tao-primary-blue"
                            type="submit"
                            onPress={handleSubmit}
                        />
                    </div>
                </div>
            </div>

            <AlertModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                title={alertModalProps.title}
                message={alertModalProps.message}
                type={alertModalProps.type as "error" | "success" | "info"}
                buttonText={alertModalProps.buttonText}
                withConfirm={alertModalProps.withConfirm}
                onConfirm={alertModalProps.onConfirm}
            />
        </TaoLayout>
    );
}
