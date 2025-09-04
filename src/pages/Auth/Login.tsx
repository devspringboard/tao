import { IonImg, useIonLoading } from "@ionic/react";
import { PageLayout } from "../../components/PageLayout";
import { InputComponent } from "../../components/InputComponent";
import { InputPasswordComponent } from "../../components/InputPasswordComponent";
import { Button } from "@heroui/button";
import { useTaoForm } from "../../hooks/useTaoForm";
import { loginSchema, LoginSchemaType } from "../../validations/authSchema";

import { useDispatch } from "react-redux";
import { useLoginMutation } from "../../services/mutation/authMutation";
import { setUser, setToken } from "../../redux/reducers/authSlice";
import { AxiosError } from "axios";
import { useState } from "react";
import AlertModal from "../../components/Modal/AlertModal";
import { LargeLogin } from "../../features";

export default function Login() {
    const dispatch = useDispatch();
    const [present, dismiss] = useIonLoading();
    const [isOpen, setIsOpen] = useState(false);
    const [alert, setAlert] = useState({
        type: "",
        title: "",
        message: "",
        withConfirm: false,
        buttonText: "Okay",
    });

    const {
        register: registerLogin,
        handleSubmit: handleLoginSubmit,
        formState: { errors: errorsLogin },
        setError: setErrorLogin,
    } = useTaoForm(loginSchema);

    const { Login } = useLoginMutation();

    const onSubmitLogin = (data: LoginSchemaType) => {
        present({
            message: "Please wait...",
            spinner: "crescent",
        });

        Login(data, {
            onSuccess: (response) => {
                dismiss();
                const user = response?.data?.resident;
                const token = response?.data?.token;

                dispatch(setUser(user));
                dispatch(setToken(token));
            },
            onError: (error) => {
                dismiss();

                handleLoginError(error as AxiosError);
            },
        });
    };

    const handleLoginError = (error: AxiosError) => {
        const { response } = error;

        if (response?.status === 422) {
            const { errors: validationErrors } = response.data as {
                errors: Record<string, string[]>;
            };
            const fieldMappings: Record<string, string> = {
                email: "email",
                password: "password",
                // Add other fields as necessary
            };

            Object.keys(validationErrors).forEach((field) => {
                const payloadField = fieldMappings[field] || field;
                setErrorLogin(payloadField as keyof LoginSchemaType, {
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

    return (
        <>
            <PageLayout>
                <LargeLogin />

                <div className="container mx-auto  bg-tao-primary-blue h-auto pt-[100px] xl:hidden">
                    <div className="py-[50px] flex flex-col items-center gap-[15px]">
                        <IonImg src="/assets/images/login-icon.svg"></IonImg>
                        <div className="text-center">
                            <h1 className="text-[32px] font-[700] text-[#F9F9F9]">Welcome Back!</h1>
                            <p className="text-[#E2E2E2] text-[14px]">Sign in to continue</p>
                        </div>
                    </div>
                    <div className="bg-tao-white rounded-t-[48px] px-[30px] h-[290px] ">
                        <form onSubmit={handleLoginSubmit(onSubmitLogin)}>
                            <div className="flex flex-col gap-[25px] self-stretch pt-10">
                                <InputComponent
                                    label="Email"
                                    placeholder="Enter Email"
                                    type="text"
                                    variant="flat"
                                    color="default"
                                    radius="md"
                                    size="lg"
                                    inputStyle={{
                                        label: "text-[12px]",
                                    }}
                                    register={registerLogin}
                                    name="email"
                                    error={errorsLogin?.email?.message}
                                />
                                <InputPasswordComponent
                                    size="lg"
                                    radius="md"
                                    label="Password"
                                    variant="flat"
                                    placeholder="Enter Password"
                                    color="default"
                                    inputStyle={{
                                        label: "text-[12px]",
                                    }}
                                    register={registerLogin}
                                    name="password"
                                    error={errorsLogin?.password?.message}
                                />

                                <div className="flex flex-col gap-[10px]">
                                    <Button
                                        className="bg-tao-primary-blue text-tao-white text-[14px]"
                                        variant="solid"
                                        color="default"
                                        size="md"
                                        radius="md"
                                        fullWidth={true}
                                        type="submit"
                                    >
                                        Login
                                    </Button>
                                    <p className="text-tao-charcoal-300">
                                        Don’t have an account yet?{" "}
                                        <a href="/signup" className="text-tao-primary-red font-[700]">
                                            Sign Up
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <AlertModal
                    title={alert.title}
                    type={alert.type as "error" | "success" | "info"}
                    message={alert.message}
                    withConfirm={alert.withConfirm}
                    buttonText={alert.buttonText}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                />
            </PageLayout>
        </>
    );
}
