import { IonImg, useIonLoading } from "@ionic/react";
import { InputComponent } from "../../../components/InputComponent";
import { InputPasswordComponent } from "../../../components/InputPasswordComponent";
import { useState } from "react";
import { useTaoForm } from "../../../hooks/useTaoForm";
import { useDispatch } from "react-redux";
import { loginSchema, LoginSchemaType } from "../../../validations/authSchema";
import { useLoginMutation } from "../../../services/mutation/authMutation";
import { setUser, setToken } from "../../../redux/reducers/authSlice";
import { AxiosError } from "axios";
import { Button } from "@heroui/button";

export default function LargeLogin() {
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
        <div className="hidden xl:flex bg-tao-primary-blue min-h-screen w-full">
            <div className="container mx-auto flex flex-col items-center justify-center gap-[50px]">
                <div className="flex flex-col items-center justify-center gap-[15px]">
                    <IonImg src="/assets/images/login-icon.svg" />

                    <div className="text-center">
                        <h1 className="text-[32px] font-[700] text-[#F9F9F9]">Welcome Back!</h1>
                        <p className="text-[#E2E2E2] text-[14px]">Sign in to continue</p>
                    </div>
                </div>

                <div className="bg-tao-white rounded-[24px] px-[30px] h-[350px] w-[600px]">
                    <form onSubmit={handleLoginSubmit(onSubmitLogin)}>
                        <div className="flex flex-col gap-[25px] self-stretch pt-10">
                            <InputComponent
                                label="Email"
                                placeholder="Enter Email"
                                type="text"
                                variant="flat"
                                color="default"
                                radius="md"
                                size="md"
                                inputStyle={{
                                    label: "text-[12px]",
                                }}
                                register={registerLogin}
                                name="email"
                                error={errorsLogin?.email?.message}
                            />
                            <InputPasswordComponent
                                size="md"
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
                                <p className="text-tao-charcoal-300 cursor-pointer">
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
        </div>
    );
}
