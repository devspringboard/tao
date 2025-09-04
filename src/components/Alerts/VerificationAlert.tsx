import { Button } from "@heroui/button";
import { IonImg, IonText } from "@ionic/react";

interface VerificationAlertProps {
    variant: "warning" | "info" | "error";
    title: string;
    description: string;
    withButton?: boolean;
    buttonText?: string;
    buttonOnClick?: () => void;
}

const variantStyles = {
    warning: {
        icon: "/assets/images/Icons/ShieldWarning.svg",
        bgColor: "bg-tao-warning-400",
        borderColor: "border border-tao-warning-900",
        textColor: "text-tao-warning-900",
        bgImgColor: "bg-tao-warning-500",
    },
    info: {
        icon: "/assets/images/Icons/Eye.svg",
        bgColor: "bg-tao-info-400",
        borderColor: "border border-tao-info-900",
        textColor: "text-tao-info-900",
        bgImgColor: "bg-tao-info-500",
    },
    error: {
        icon: "/assets/images/Icons/Close Circle.svg",
        bgColor: "bg-tao-white-100",
        borderColor: "border border-tao-alert-900",
        textColor: "text-tao-alert-600",
        bgImgColor: "bg-tao-alert-200",
    },
};

export default function VerificationAlert({
    variant,
    title,
    description,
    withButton = false,
    buttonText = "OK",
    buttonOnClick,
}: VerificationAlertProps) {
    const { icon, bgColor, borderColor, textColor, bgImgColor } =
        variantStyles[variant] || variantStyles.warning;

    return (
        <div
            className={`flex flex-col p-4 justify-end items-center gap-y-4 self-stretch flex-wrap ${bgColor} ${borderColor} rounded-xl`}
        >
            <div className="flex items-center gap-4 min-w-[317px]">
                <IonImg src={icon} className={`p-2 rounded-full ${bgImgColor}`} />
                <IonText>
                    <h3 className={`text-sm font-bold ${textColor}`}>{title}</h3>
                    <p className={`text-xs ${textColor}`}>{description}</p>
                </IonText>
            </div>

            {withButton && (
                <Button
                    className={`${
                        variant === "warning"
                            ? "bg-tao-warning-500 text-tao-warning-900"
                            : variant === "info"
                            ? "bg-tao-info-500 text-tao-info-900"
                            : "bg-tao-alert-200 text-tao-alert-600"
                    } self-end font-bold`}
                    variant="solid"
                    color="default"
                    size="md"
                    radius="md"
                    onPress={buttonOnClick}
                >
                    {buttonText}
                </Button>
            )}
        </div>
    );
}
