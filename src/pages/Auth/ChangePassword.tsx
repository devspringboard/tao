import { IonImg, IonText, useIonLoading } from "@ionic/react";
import { TaoLayout } from "../../components/Layout/TaoLayout";
import { useDispatch } from "react-redux";
import { useLogout } from "../../services/mutation/authMutation";
import { useHistory } from "react-router";
import { useState } from "react";
import { setUser } from "../../redux/reducers/authSlice";
import { setToken } from "../../redux/reducers/authSlice";
import { useTaoForm } from "../../hooks/useTaoForm";
import { changePasswordSchema, ChangePasswordSchemaType } from "../../validations/authSchema";
import { useChangePasswordMutation } from "../../services/mutation/authMutation";
import { AxiosError } from "axios";
import { InputPasswordComponent } from "../../components/InputPasswordComponent";
import { Button } from "@heroui/react";
import AlertModal from "../../components/Modal/AlertModal";

export default function ChangePassword() {
    const dispatch = useDispatch();
    const { LogOut } = useLogout();
    const history = useHistory();

    const [isOpenPassword, setIsOpenPassword] = useState(false);
    const [present, dismiss] = useIonLoading();
    const [alertModalProps, setAlertModalProps] = useState({
        title: "",
        message: "",
        type: "error",
        onConfirm: () => {},
        buttonText: "",
    });

    const {
        register: registerChangePassword,
        formState: { errors: errorsChangePassword },
        handleSubmit: handleChangePasswordSubmit,
        setError: setErrorChangePassword,
    } = useTaoForm(changePasswordSchema);

    const { ChangePassword } = useChangePasswordMutation();

    const onSubmitChangePassword = (data: ChangePasswordSchemaType) => {
        present({
            message: "Updating password... Please wait.",
        });

        ChangePassword(data, {
            onSuccess: () => {
                dismiss();
                setIsOpenPassword(true);
                setAlertModalProps({
                    title: "Password Updated",
                    message: "Session will expire once you confirm.",
                    type: "success",
                    onConfirm: () => {
                        LogOut(undefined, {
                            onSuccess: () => {
                                dismiss();
                                dispatch(setUser(null));
                                dispatch(setToken(null));
                                history.push("/login");
                            },
                        });
                    },
                    buttonText: "Confirm",
                });
            },
            onError: (error) => {
                dismiss();
                handleChangePasswordError(error as AxiosError);
            },
        });
    };

    const handleChangePasswordError = (error: AxiosError) => {
        const { response } = error;

        if (response?.status === 422) {
            const { errors: validationErrors } = response.data as {
                errors: Record<string, string[]>;
            };

            const fieldMappings: Record<string, string> = {
                old_password: "old_password",
                new_password: "new_password",
                confirm_new_password: "confirm_new_password",
            };

            Object.keys(validationErrors).forEach((field) => {
                const payloadField = fieldMappings[field] || field;
                setErrorChangePassword(payloadField as keyof ChangePasswordSchemaType, {
                    type: "server",
                    message: validationErrors[field][0], // Show first error message
                });
            });
        }
    };

    return (
        <TaoLayout>
            <div className="container flex flex-col p-[16px] mx-auto">
                <IonText className="flex flex-col gap-[2px] mb-5">
                    <div className="flex items-center justify-start gap-[10px] self-stretch">
                        <IonImg src="assets/images/Security/Lock.svg"></IonImg>
                        <h1 className="text-tao-primary-blue text-[18px] font-[700]">
                            Change Password
                        </h1>
                    </div>

                    <p className="text-[12px] mt-1 text-tao-charcoal-300">
                        Changing your password will log you out of all your devices
                    </p>
                </IonText>

                <form
                    className="flex flex-col justify-between h-[629px]"
                    onSubmit={handleChangePasswordSubmit(onSubmitChangePassword)}
                >
                    <div className="space-y-10">
                        <InputPasswordComponent
                            size="lg"
                            radius="md"
                            label="Old Password"
                            variant="flat"
                            placeholder="Old Password"
                            color="default"
                            inputStyle={{
                                label: "text-[12px]",
                            }}
                            name="old_password"
                            register={registerChangePassword}
                            error={errorsChangePassword?.old_password?.message}
                        />

                        <InputPasswordComponent
                            size="lg"
                            radius="md"
                            label="New Password"
                            variant="flat"
                            placeholder="Enter New Password"
                            color="default"
                            inputStyle={{
                                label: "text-[12px]",
                            }}
                            name="new_password"
                            register={registerChangePassword}
                            error={errorsChangePassword?.new_password?.message}
                        />

                        <InputPasswordComponent
                            size="lg"
                            radius="md"
                            label="Confirm New Password"
                            variant="flat"
                            placeholder="Re-enter New Password"
                            color="default"
                            inputStyle={{
                                label: "text-[12px]",
                            }}
                            name="confirm_new_password"
                            register={registerChangePassword}
                            error={errorsChangePassword?.confirm_new_password?.message}
                        />
                    </div>

                    <div className="flex gap-x-[10px]">
                        <Button
                            className="text-tao-primary-blue text-[14px] font-[500] border-button"
                            variant="bordered"
                            color="primary"
                            size="md"
                            radius="md"
                            fullWidth={true}
                            type="submit"
                            onPress={() => history.goBack()}
                        >
                            Back
                        </Button>

                        <Button
                            className="bg-tao-primary-blue text-tao-white text-[14px]"
                            variant="solid"
                            color="default"
                            size="md"
                            radius="md"
                            fullWidth={true}
                            type="submit"
                        >
                            Save
                        </Button>
                    </div>
                </form>
            </div>

            <AlertModal
                isOpen={isOpenPassword}
                setIsOpen={setIsOpenPassword}
                title={alertModalProps.title}
                message={alertModalProps.message}
                type={alertModalProps.type as "error" | "success" | "info"}
                buttonText={alertModalProps.buttonText}
                withConfirm={true}
                onConfirm={alertModalProps.onConfirm}
            />
        </TaoLayout>
    );
}
