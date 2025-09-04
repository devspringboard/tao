import { Button } from "@heroui/react";

interface BorderedButtonComponentProps {
    variant: "solid" | "bordered" | "light" | "flat" | "faded" | "shadow" | "ghost";

    color: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
    radius: "sm" | "md" | "lg" | "full";
    size: "sm" | "md" | "lg";
    buttonName: string;
    fullWidth?: boolean;
    onPress?: () => void;
}

export function BorderedButtonComponent({
    variant,
    color,
    radius,
    size,
    buttonName,
    fullWidth = true,
    onPress,
}: BorderedButtonComponentProps) {
    return (
        <>
            <Button
                className="border-button text-tao-primary-blue bg-tao-white"
                variant={variant}
                color={color}
                radius={radius}
                size={size}
                fullWidth={fullWidth}
                onPress={onPress}
            >
                {buttonName}
            </Button>
        </>
    );
}
