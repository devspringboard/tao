import { IonImg, IonText, useIonLoading } from "@ionic/react";
import { PageLayout } from "../../components/PageLayout";
import { InputComponent } from "../../components/InputComponent";
import { Button } from "@heroui/button";
import { SelectComponent } from "../../components/SelectComponent";
import { InputPasswordComponent } from "../../components/InputPasswordComponent";
import { Checkbox } from "@heroui/checkbox";

import { useTaoForm } from "../../hooks/useTaoForm";
import { signupSchema, SignupSchemaType } from "../../validations/authSchema";
import { useSignupMutation } from "../../services/mutation/authMutation";

import { useDispatch, useSelector } from "react-redux";

import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import AlertModal from "../../components/Modal/AlertModal";
import TermsModal from "../../components/Modal/TermsModal";
import PrivacyModal from "../../components/Modal/PrivacyModal";
import { useGetBarangays } from "../../services/queries/barangay/barangayQuery";
import { setUser, setToken } from "../../redux/reducers/authSlice";
import { LargeSignup } from "../../features";

export default function Signup() {
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
        <PageLayout pageStyle="ion-padding">
            <LargeSignup />

            <div className="container py-[40px] mx-auto xl:hidden">
                <div className="flex flex-col justify-center items-center gap-[12px] w-[305px] mx-auto">
                    <IonImg src="/assets/images/tao-logo.png" />
                    <div>
                        <IonText className="text-center">
                            <h1 className="text-tao-primary-blue text-[32px] font-bold">Create an Account</h1>
                            <p className="text-tao-charcoal-300 text-[14px] font-normal">
                                Already have an Account?{" "}
                                <a href="/login" className="font-bold text-tao-primary-red">
                                    Log In
                                </a>
                            </p>
                        </IonText>
                    </div>
                </div>

                <form onSubmit={handleSignupSubmit(onSubmitSignup)} className="mt-[25px] flex flex-col justify-center items-center">
                    <div className="flex flex-col gap-[15px] self-stretch">
                        <InputComponent
                            label="First Name"
                            placeholder="Enter First Name"
                            type="text"
                            variant="flat"
                            color="default"
                            radius="md"
                            size="md"
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
                            radius="md"
                            size="md"
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
                            radius="md"
                            size="md"
                            inputStyle={{
                                label: "text-[12px]",
                            }}
                            name="last_name"
                            register={registerSignup}
                            error={errorsSignup?.last_name?.message}
                        />
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

                    <div className="mt-[25px] self-stretch">
                        <Button
                            radius="md"
                            variant="solid"
                            className="bg-tao-primary-blue text-tao-white"
                            color="default"
                            fullWidth={true}
                            type="submit"
                            isDisabled={!isChecked}
                        >
                            Create Account
                        </Button>
                    </div>
                </form>

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
        </PageLayout>
    );
}
