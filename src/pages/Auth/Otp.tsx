import { useEffect, useState } from "react";

import { IonImg, IonText, useIonLoading } from "@ionic/react";
import { PageLayout } from "../../components/PageLayout";
import { InputOtp } from "@heroui/input-otp";
import { Button } from "@heroui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useHistory } from "react-router";
import { Link } from "@heroui/link";
import { useResendOTP, useVerifyOTP } from "../../services/mutation/authMutation";
import { useTaoForm } from "../../hooks/useTaoForm";
import { otpSchema, OtpSchemaType } from "../../validations/authSchema";
import { setUser } from "../../redux/reducers/authSlice";
import AlertModal from "../../components/Modal/AlertModal";
import { AxiosError } from "axios";

export default function Otp() {
    const { user } = useSelector((state: RootState) => state.auth);

    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [disableResend, setDisableResend] = useState(false);
    const [alertModalProps, setAlertModalProps] = useState({
        title: "",
        message: "",
        type: "error",
        onConfirm: () => {},
        buttonText: "",
        withConfirm: false,
    });

    const dispatch = useDispatch();
    const [present, dismiss] = useIonLoading();
    const history = useHistory();

    if (user?.email_verified_at) {
        history.push("/dashboard");
    }

    const user_id = user?.id as number;

    useEffect(() => {
        const interval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }

            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(interval);
                } else {
                    setSeconds(59);
                    setMinutes(minutes - 1);
                }
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [seconds]);

    const { resendOTP } = useResendOTP();
    const handleResendOTP = () => {
        present({
            message: "Please wait...",
        });
        resendOTP(
            { user_id },
            {
                onSuccess: () => {
                    dismiss();
                    setMinutes(4);
                    setSeconds(59);
                    setDisableResend(true);
                },
                onError: (error) => {
                    console.log(error);
                },
            }
        );
    };

    const {
        register: registerVerifyOtp,
        handleSubmit: handleVerifyOtpSubmit,
        formState: { errors: errorsVerifyOtp },
    } = useTaoForm(otpSchema);

    const { verifyOTP } = useVerifyOTP();

    const handleVerifyOTP = (data: OtpSchemaType) => {
        present({
            message: "Please wait...",
            spinner: "crescent",
        });
        verifyOTP(
            { user_id, data },
            {
                onSuccess: (response) => {
                    dismiss();
                    setIsOpen(true);

                    setAlertModalProps({
                        title: "Success",
                        message: "OTP verified successfully",
                        type: "success",
                        onConfirm: () => {
                            history.push("/dashboard");
                            dispatch(setUser(response?.data.user));
                        },
                        buttonText: "Confirm",
                        withConfirm: true,
                    });
                },
                onError: (error) => {
                    // dismiss();
                    const { response } = error as AxiosError;

                    setAlertModalProps({
                        title: "Verification Failed",
                        message:
                            (response?.data as { message?: string })?.message ||
                            "An error occurred",
                        type: "error",
                        onConfirm: () => {},
                        buttonText: "OK",
                        withConfirm: false,
                    });
                    setIsOpen(true);
                },
            }
        );
    };

    return (
        <PageLayout pageStyle="ion-padding">
            <div className="container py-[60px] mx-auto">
                <div className="flex flex-col justify-center items-center gap-[12px] w-[305px] mx-auto">
                    <IonImg src="/assets/images/tao-logo.png" />

                    {Boolean(minutes && seconds) && (
                        <IonText>
                            <div className="flex flex-col text-center self-stretch">
                                <h1 className="text-[#022C25] text-[32px] font-[700]">Enter OTP</h1>
                                <p className="text-[12px] text-[#141212]">
                                    Let's verify your email address
                                </p>
                                <p
                                    className={`text-[12px] text-[#848484] mt-[15px] ${
                                        minutes < 1 && seconds < 30
                                            ? "text-tao-primary-red font-bold"
                                            : ""
                                    }`}
                                >
                                    {minutes < 10 ? `0${minutes}` : minutes}:
                                    {seconds < 10 ? `0${seconds}` : seconds}
                                </p>
                            </div>
                        </IonText>
                    )}
                </div>

                <form
                    className="flex flex-col gap-[390px]"
                    onSubmit={handleVerifyOtpSubmit(handleVerifyOTP)}
                >
                    <div className="flex w-full flex-col gap-[5px] text-[12px] items-center mt-[60px]">
                        <InputOtp
                            length={6}
                            variant="flat"
                            size="lg"
                            {...registerVerifyOtp("otp", {
                                valueAsNumber: true,
                                validate: (value) => value > 0,
                            })}
                            isInvalid={!!errorsVerifyOtp.otp?.message}
                            errorMessage={errorsVerifyOtp.otp?.message}
                        />
                        <p className="text-[#A0A0A0]">
                            Check your email for the One-Time Password (OTP)
                        </p>
                    </div>

                    <div className="mt-[25px] self-stretch text-center flex flex-col gap-[10px]">
                        <Button
                            radius="md"
                            variant="solid"
                            className="bg-tao-primary-blue text-tao-white"
                            color="default"
                            fullWidth={true}
                            type="submit"
                        >
                            Submit
                        </Button>

                        <p className="text-[#A0A0A0]">
                            Didn't receive a code?{" "}
                            <Link
                                className="text-tao-primary-blue font-[700]"
                                onPress={() => {
                                    if (!disableResend) {
                                        handleResendOTP();
                                    }
                                }}
                                isDisabled={disableResend}
                            >
                                Resend OTP
                            </Link>
                        </p>
                    </div>
                </form>
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
        </PageLayout>
    );
}
