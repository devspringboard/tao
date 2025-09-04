import { VerificationLayout } from "../../components/Layout/VerificationLayout";
import { BorderedButtonComponent } from "../../components/BorderedButtonComponent";
import { SolidButtonComponent } from "../../components/SolidButtonComponent";
import { UploadFileComponents } from "../../components/UploadFileComponents";
import { SelectComponent } from "../../components/SelectComponent";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    identityVerificationSchema,
    IdentityVerificationSchemaType,
} from "../../validations/profileVerificationSchema";
import { useTaoForm } from "../../hooks/useTaoForm";
import { useEffect, useState } from "react";
import { setIdentityVerification } from "../../redux/reducers/verificationSlice";
import { useGetAcceptingIds } from "../../services/queries/profile-verification/profileVerificationQuery";
import { RootState } from "../../redux/store";
import { useCreateProfile } from "../../services/mutation/profileVerificationMutation";
import {
    PersonalDetailsSchemaType,
    ContactAddressSchemaType,
    GovernmentProgramsSchemaType,
} from "../../validations/profileVerificationSchema";
import { UserProps } from "../../types/appTypes";
import { useIonLoading } from "@ionic/react";
import { AxiosError } from "axios";
import AlertModal from "../../components/Modal/AlertModal";

export default function IdentityVerification() {
    const history = useHistory();
    const dispatch = useDispatch();

    const [frontImage, setFrontImage] = useState<string | null>(null);
    const [backImage, setBackImage] = useState<string | null>(null);
    const [selfieImage, setSelfieImage] = useState<string | null>(null);
    const { acceptingIdsOptions } = useGetAcceptingIds();
    const [alert, setAlert] = useState({
        type: "",
        title: "",
        message: "",
        withConfirm: false,
        buttonText: "Okay",
    });
    const [isOpen, setIsOpen] = useState(false);

    const [present, dismiss] = useIonLoading();

    const personalDetails = useSelector((state: RootState) => state.verification.personalDetails);
    const contactAddress = useSelector((state: RootState) => state.verification.contactAddress);
    const governmentPrograms = useSelector(
        (state: RootState) => state.verification.governmentPrograms
    );
    const identityVerification = useSelector(
        (state: RootState) => state.verification.identityVerification
    );

    const user = useSelector((state: RootState) => state.auth.user) as UserProps | null;

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        setError,
    } = useTaoForm(identityVerificationSchema);

    const { createProfile } = useCreateProfile();

    const onSubmit = async (data: IdentityVerificationSchemaType) => {
        dispatch(setIdentityVerification(data));

        present({
            message: "Please wait... While we process your application",
            spinner: "crescent",
        });

        createProfile(
            {
                personalDetails: personalDetails as PersonalDetailsSchemaType,
                contactAddress: contactAddress as ContactAddressSchemaType,
                governmentPrograms: governmentPrograms as GovernmentProgramsSchemaType,
                identityVerification: data as IdentityVerificationSchemaType,
                userId: user?.id as number,
            },
            {
                onSuccess: () => {
                    dismiss();
                    history.push("/application-submitted");
                },
                onError: (error) => {
                    dismiss();

                    handleError(error as AxiosError);
                },
            }
        );
    };

    const handleError = (error: AxiosError) => {
        const { response } = error;

        if (response?.status === 422) {
            const { errors: validationErrors } = response.data as {
                errors: Record<string, string[]>;
            };
            const fieldMappings: Record<string, string> = {
                front_id: "id_front_image",
                back_id: "id_back_image",
                selfie_verification: "id_selfie_image",
                id_type: "id_type",
            };

            Object.keys(validationErrors).forEach((field) => {
                const payloadField = fieldMappings[field] || field;
                setError(payloadField as keyof IdentityVerificationSchemaType, {
                    type: "server",
                    message: validationErrors[field][0], // Display the first error message
                });
            });

            setIsOpen(true);
            setAlert({
                type: "error",
                title: "Error",
                message: "Please fill all required fields",
                withConfirm: false,
                buttonText: "Okay",
            });
        } else if (response?.status === 401) {
            setIsOpen(true);
            setAlert({
                type: "error",
                title: "Error",
                message: (response?.data as { message: string }).message,
                withConfirm: false,
                buttonText: "Okay",
            });
        } else {
            const errorMessage = (response?.data as { message: string }).message; // Type assertion
            setIsOpen(true);
            setAlert({
                type: "error",
                title: "Error",
                message: errorMessage,
                withConfirm: false,
                buttonText: "Okay",
            });
        }
    };

    // Sync state with form values
    useEffect(() => {
        setValue("id_front_image", frontImage ?? "");
        setValue("id_back_image", backImage ?? "");
        setValue("id_selfie_image", selfieImage ?? "");
    }, [frontImage, backImage, selfieImage, setValue]);

    useEffect(() => {
        if (identityVerification) {
            setValue("id_front_image", identityVerification.id_front_image);
            setValue("id_back_image", identityVerification.id_back_image);
            setValue("id_selfie_image", identityVerification.id_selfie_image);
        }
    }, []);

    return (
        <VerificationLayout
            progressBar="/assets/images/progressbar4.svg"
            title="Identity Verification"
        >
            <form
                className="flex flex-col gap-[60px] self-stretch h-auto"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="flex flex-col gap-[10px] self-stretch">
                    <SelectComponent
                        label="ID Type"
                        placeholder="Please Select"
                        size="sm"
                        color="default"
                        inputStyle={{
                            label: "text-[12px]",
                        }}
                        register={register}
                        error={errors.id_type?.message}
                        name="id_type"
                        items={acceptingIdsOptions}
                    />

                    <UploadFileComponents
                        label="Front of ID"
                        setImage={setFrontImage}
                        image={frontImage}
                        key="front-id"
                        error={errors.id_front_image?.message}
                    />
                    <UploadFileComponents
                        label="Back of ID"
                        setImage={setBackImage}
                        image={backImage}
                        key="back-id"
                        error={errors.id_back_image?.message}
                    />
                    <UploadFileComponents
                        label="Upload a Selfie"
                        setImage={setSelfieImage}
                        image={selfieImage}
                        key="selfie-id"
                        error={errors.id_selfie_image?.message}
                    />
                </div>

                <div className="flex items-center gap-[50px] self-stretch">
                    <BorderedButtonComponent
                        radius="md"
                        variant="solid"
                        color="default"
                        size="md"
                        buttonName="Cancel"
                        onPress={() => history.goBack()}
                    />

                    <SolidButtonComponent
                        radius="md"
                        variant="solid"
                        color="default"
                        size="md"
                        buttonName="Proceed"
                        fullWidth={true}
                        customColor="tao-primary-blue"
                        type="submit"
                    />
                </div>
            </form>

            <AlertModal
                title={alert.title}
                type={alert.type as "error" | "success" | "info"}
                message={alert.message}
                withConfirm={alert.withConfirm}
                buttonText={alert.buttonText}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            />
        </VerificationLayout>
    );
}
