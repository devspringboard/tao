import { Button } from "@heroui/react";
import { IonImg } from "@ionic/react";

interface SolidButtonComponentProps {
    variant: "solid" | "bordered" | "light" | "flat" | "faded" | "shadow" | "ghost";

    color: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
    radius: "sm" | "md" | "lg" | "full";
    size: "sm" | "md" | "lg";
    buttonName: string;
    customColor?: string;
    fullWidth: boolean;
    onPress?: () => void;
    type?: "button" | "submit" | "reset";
    buttonImg?: string;
    isPrimaryRed?: boolean;
}

export function SolidButtonComponent({
    variant,
    color,
    radius,
    size,
    buttonName,
    customColor,
    fullWidth,
    onPress,
    type,
    buttonImg,
    isPrimaryRed,
}: SolidButtonComponentProps) {
    return (
        <>
            <Button
                className={`bg-${customColor} text-tao text-tao-white`}
                fullWidth={fullWidth}
                variant={variant}
                color={color}
                radius={radius}
                size={size}
                onPress={onPress}
                type={type}
            >
                <div className={`flex ${!isPrimaryRed ? "gap-[8px]" : ""}`}>
                    <IonImg src={buttonImg} alt={buttonImg} />
                    {buttonName}
                </div>{" "}
            </Button>
        </>
    );
}
