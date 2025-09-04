import { IonImg } from "@ionic/react";
import { InputComponent } from "../../../components/InputComponent";
import { SelectComponent } from "../../../components/SelectComponent";
import { InputPasswordComponent } from "../../../components/InputPasswordComponent";
import { Button } from "@heroui/button";
import { Checkbox } from "@heroui/checkbox";
import { useGetBarangays } from "../../../services/queries/barangay/barangayQuery";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useIonLoading } from "@ionic/react";

import { AxiosError } from "axios";

import { useSignupMutation } from "../../../services/mutation/authMutation";

import { setUser, setToken } from "../../../redux/reducers/authSlice";
import { useTaoForm } from "../../../hooks/useTaoForm";
import { signupSchema, SignupSchemaType } from "../../../validations/authSchema";
import AlertModal from "../../../components/Modal/AlertModal";
import TermsModal from "../../../components/Modal/TermsModal";
import PrivacyModal from "../../../components/Modal/PrivacyModal";

export default function LargeSignup() {
    const { isLoading: isBarangayLoading, barangayOptions } = useGetBarangays();

    const dispatch = useDispatch();
    const [isChecked, setIsChecked] = useState(false);
    const [present, dismiss] = useIonLoading();
    const [isOpen, setIsOpen] = useState(false);
    const [isTermsOpen, setIsTermsOpen] = useState(false);
    const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [privacyAccepted, setPrivacyAccepted] = useState(false);
    const [alert, setAlert] = useState({
        type: "",
        title: "",
        message: "",
        onConfirm: () => {},
        buttonText: "Okay",
    });

    const {
        register: registerSignup,
        formState: { errors: errorsSignup },
        handleSubmit: handleSignupSubmit,
        setError: setErrorSignup,
        reset: resetSignup,
        watch: watchSignup,
    } = useTaoForm(signupSchema);

    const barangayId = watchSignup("barangay_id");
    const { isPending, Signup } = useSignupMutation();

    const onSubmitSignup = (data: SignupSchemaType) => {
        present({
            message: "Please wait...",
            spinner: "crescent",
        });

        Signup(data, {
            onSuccess: (response) => {
                dismiss();
                const user = response?.data?.resident;
                const token = response?.data?.token;

                dispatch(setUser(user));
                dispatch(setToken(token));
            },
            onError: (error) => {
                dismiss();
                handleSignupError(error as AxiosError);
            },
        });
    };

    const handleSignupError = (error: AxiosError) => {
        const { response } = error;

        if (response?.status === 422) {
            const { errors: validationErrors } = response.data as {
                errors: Record<string, string[]>;
            };
            const fieldMappings: Record<string, string> = {
                fisrt_name: "first_name",
                middle_name: "middle_name",
                last_name: "last_name",
                email: "email",
                barangay_id: "barangay_id ",
                password: "password",
                password_confirmation: "password_confirmation",
                // Add other fields as necessary
            };

            Object.keys(validationErrors).forEach((field) => {
                const payloadField = fieldMappings[field] || field;
                setErrorSignup(payloadField as keyof SignupSchemaType, {
                    type: "server",
                    message: validationErrors[field][0], // Show first error message
                });
            });

            setIsOpen(true);
            setAlert({
                type: "error",
                title: "Signup Error",
                message: "Please correct the errors and try again.",
                onConfirm: () => {},
                buttonText: "Okay",
            });
        } else {
            setIsOpen(true);
            setAlert({
                type: "error",
                title: "Error",
                message: (response?.data as { message: string })?.message || "Signup failed.",
                onConfirm: () => {},
                buttonText: "Okay",
            });
        }
    };

    useEffect(() => {
        if (termsAccepted || privacyAccepted) {
            setIsChecked(true);
        }
    }, [termsAccepted, privacyAccepted]);

    return (
        <>
            <div className="min-h-screen hidden xl:flex">
                <div className="flex flex-col justify-center items-center gap-[50px] w-full">
                    <div className="flex flex-col items-center justify-center gap-[15px]">
                        <IonImg src="/assets/images/tao-logo.png" />
                        <div className="text-center">
                            <h1 className="text-[32px] font-[700] text-tao-primary-blue">Create an Account</h1>
                            <p className="text-tao-charcoal-300 text-[14px]">
                                Already have an Account?{" "}
                                <a href="/login" className="font-bold text-tao-primary-red">
                                    Log In
                                </a>
                            </p>
                        </div>
                    </div>

                    <form onSubmit={handleSignupSubmit(onSubmitSignup)} className="flex flex-col gap-[20px] w-full max-w-[1440px]">
                        <div className="grid grid-cols-3 gap-[10px]">
                            <InputComponent
                                label="First Name"
                                placeholder="Enter First Name"
                                type="text"
                                variant="flat"
                                color="default"
                                radius="sm"
                                size="sm"
                                inputStyle={{
                                    label: "text-[12px]",
                                }}
                                name="first_name"
                                register={registerSignup}
                                error={errorsSignup?.first_name?.message}
                            />
                            <InputComponent
                                label="Middle Name"
                                placeholder="Enter Middle Name"
                                type="text"
                                variant="flat"
                                color="default"
                                radius="sm"
                                size="sm"
                                inputStyle={{
                                    label: "text-[12px]",
                                }}
                                name="middle_name"
                                register={registerSignup}
                                error={errorsSignup?.middle_name?.message}
                            />
                            <InputComponent
                                label="Last Name"
                                placeholder="Enter Last Name"
                                type="text"
                                variant="flat"
                                color="default"
                                radius="sm"
                                size="sm"
                                inputStyle={{
                                    label: "text-[12px]",
                                }}
                                name="last_name"
                                register={registerSignup}
                                error={errorsSignup?.last_name?.message}
                            />
                        </div>

                        <div className="grid grid-cols-3 gap-[10px]">
                            <InputComponent
                                label="First Name"
                                placeholder="Enter First Name"
                                type="text"
                                variant="flat"
                                color="default"
                                radius="sm"
                                size="sm"
                                inputStyle={{
                                    label: "text-[12px]",
                                }}
                                name="first_name"
                                register={registerSignup}
                                error={errorsSignup?.first_name?.message}
                            />
                            <InputComponent
                                label="Middle Name"
                                placeholder="Enter Middle Name"
                                type="text"
                                variant="flat"
                                color="default"
                                radius="sm"
                                size="sm"
                                inputStyle={{
                                    label: "text-[12px]",
                                }}
                                name="middle_name"
                                register={registerSignup}
                                error={errorsSignup?.middle_name?.message}
                            />
                            <InputComponent
                                label="Last Name"
                                placeholder="Enter Last Name"
                                type="text"
                                variant="flat"
                                color="default"
                                radius="sm"
                                size="sm"
                                inputStyle={{
                                    label: "text-[12px]",
                                }}
                                name="last_name"
                                register={registerSignup}
                                error={errorsSignup?.last_name?.message}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-[10px]">
                            <InputComponent
                                label="Email Address"
                                placeholder="Enter Email Address"
                                type="text"
                                variant="flat"
                                color="default"
                                radius="md"
                                size="md"
                                inputStyle={{
                                    label: "text-[12px]",
                                }}
                                name="email"
                                register={registerSignup}
                                error={errorsSignup?.email?.message}
                            />
                            <SelectComponent
                                label="Barangay"
                                placeholder="Select a Barangay"
                                size="md"
                                color="default"
                                inputStyle={{
                                    label: "text-[12px]",
                                }}
                                name="barangay_id"
                                register={registerSignup}
                                error={errorsSignup?.barangay_id?.message}
                                items={barangayOptions}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-[10px]">
                            <InputPasswordComponent
                                size="md"
                                radius="md"
                                label="Password"
                                variant="flat"
                                placeholder="Create Password"
                                color="default"
                                inputStyle={{
                                    label: "text-[12px]",
                                }}
                                name="password"
                                register={registerSignup}
                                error={errorsSignup?.password?.message}
                            />
                            <InputPasswordComponent
                                size="md"
                                radius="md"
                                label="Confirm Password"
                                variant="flat"
                                placeholder="Re-enter Password"
                                color="default"
                                inputStyle={{
                                    label: "text-[12px]",
                                }}
                                name="password_confirmation"
                                register={registerSignup}
                                error={errorsSignup?.password_confirmation?.message}
                            />
                        </div>

                        <div className="flex p-[8px] items-start gap-[8px] self-stretch">
                            <Checkbox onChange={(e) => setIsChecked(e.target.checked)} isSelected={isChecked} />
                            <div className="text-[13px] font-">
                                <p className="text-tao-charcoal-300">
                                    Creating an account means you agree with our{" "}
                                    <span className="text-tao-primary-red cursor-pointer hover:underline" onClick={() => setIsTermsOpen(true)}>
                                        Terms of Service
                                    </span>
                                    ,
                                    <span className="text-tao-primary-red cursor-pointer hover:underline" onClick={() => setIsPrivacyOpen(true)}>
                                        Privacy Policy
                                    </span>
                                </p>
                            </div>
                        </div>

                        <div className="flex justify-end self-stretch">
                            <Button
                                radius="md"
                                variant="solid"
                                className="bg-tao-primary-blue text-tao-white px-20 py-2 text-sm"
                                color="default"
                                fullWidth={false}
                                type="submit"
                                size="sm"
                                isDisabled={!isChecked}
                            >
                                Create Account
                            </Button>
                        </div>
                    </form>
                </div>
            </div>

            <AlertModal
                title={alert.title}
                type={alert.type as "error" | "success" | "info"}
                message={alert.message}
                withConfirm={true}
                buttonText={alert.buttonText}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            />

            <TermsModal isOpen={isTermsOpen} setIsOpen={setIsTermsOpen} onAccept={() => setTermsAccepted(true)} />

            <PrivacyModal isOpen={isPrivacyOpen} setIsOpen={setIsPrivacyOpen} onAccept={() => setPrivacyAccepted(true)} />
        </>
    );
}
