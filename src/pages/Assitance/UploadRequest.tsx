import { IonImg, useIonLoading } from "@ionic/react";
import { TaoLayout } from "../../components/Layout/TaoLayout";
import { useParams } from "react-router";
import { Button } from "@heroui/button";
import { BorderedButtonComponent } from "../../components/BorderedButtonComponent";
import { useHistory, useLocation } from "react-router";
import { SolidButtonComponent } from "../../components/SolidButtonComponent";
import { FilePicker, PickedFile } from "@capawesome/capacitor-file-picker";
import { useCallback, useState } from "react";
import { useApplyForAssistance } from "../../services/mutation/financialAssistanceMutation";
import AlertModal from "../../components/Modal/AlertModal";
interface UploadRequestProps {
    id: string;
}

interface LocationState {
    program_name?: string;
}

export default function UploadRequest() {
    const { id } = useParams<UploadRequestProps>();

    const location = useLocation<LocationState>();
    const program_name = location.state?.program_name;

    const history = useHistory();
    const [present, dismiss] = useIonLoading();
    const [isOpen, setIsOpen] = useState(false);
    const [alertModalProps, setAlertModalProps] = useState({
        title: "",
        message: "",
        type: "success",
        buttonText: "OK",
        withConfirm: false,
        onConfirm: () => {},
    });

    const [file, setFile] = useState<PickedFile[] | null>(null);

    // APPLY FOR ASSISTANCE
    const { applyForAssistanceMutation } = useApplyForAssistance();

    const handleSubmit = useCallback(async () => {
        present({
            message: "Please wait while we process your request...",
        });

        applyForAssistanceMutation(
            {
                data: {
                    program_id: parseInt(id),
                    file: file as unknown as File,
                },
            },
            {
                onSuccess: (response) => {
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
            }
        );
    }, [file, applyForAssistanceMutation]);

    return (
        <TaoLayout>
            <div className="container mx-auto flex flex-col justify-between pt-[120px] pb-[30px] px-[16px] self-stretch gap-[100px] ">
                <div className="flex flex-col justify-center items-center gap-[300px] self-stretch">
                    <div className="flex flex-col items-center gap-[15px] self-stretch">
                        <IonImg src="/assets/images/Request.svg" />
                        <div className="flex flex-col text-center gap-[5px] self-stretch">
                            <h3 className="text-tao-charcoal-900 font-bold text-[14px]">
                                Support your request!
                            </h3>
                            <p className="text-tao-charcoal-300 text-[12px]">
                                Uploading a supporting document will increase the chances of your
                                request being approved.
                            </p>
                        </div>
                    </div>
                    <div className="gap-[10px] flex flex-col self-stretch">
                        <Button
                            className="bg-tao-primary-red text-tao-white"
                            radius="md"
                            variant="solid"
                            size="md"
                            color="default"
                            fullWidth={true}
                            onPress={() => {
                                history.push("/supporting-documents", {
                                    program_id: id,
                                    program_name,
                                });
                            }}
                        >
                            Upload File
                        </Button>

                        <BorderedButtonComponent
                            radius="md"
                            variant="solid"
                            color="default"
                            size="md"
                            buttonName="Skip"
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
