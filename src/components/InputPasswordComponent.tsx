import EyeFilledIcon from "./Icons/EyeFilledIcon";
import EyeSlashFilledIcon from "./Icons/EyeSlashedFilledIcon";
import { useState } from "react";
import { IonItem } from "@ionic/react";
import { Input } from "@heroui/input";
import { UseFormReturn } from "react-hook-form";

interface InputPasswordComponentProps {
    label: string;
    placeholder: string;
    variant: "flat" | "bordered" | "faded";
    radius: "sm" | "md" | "lg" | "full";
    size: "sm" | "md" | "lg";
    color: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
    inputStyle?: object;
    name?: string;
    register?: UseFormReturn<any>["register"] | undefined;
    error?: string;
}

export function InputPasswordComponent({
    label,
    radius,
    size,
    variant,
    placeholder,
    color,
    inputStyle,
    name,
    register,
    error,
}: InputPasswordComponentProps) {
    const [isVisiblePassword, setIsVisiblePassword] = useState(false);

    const togglePasswordVisibility = () => {
        setIsVisiblePassword(!isVisiblePassword);
    };
    return (
        <Input
            labelPlacement="outside"
            size={size}
            radius={radius}
            label={label}
            variant={error ? "bordered" : variant}
            type={isVisiblePassword ? "text" : "password"}
            placeholder={placeholder}
            color={color}
            classNames={inputStyle}
            endContent={
                <button
                    aria-label="toggle password visibility"
                    className="focus:outline-none"
                    type="button"
                    onClick={togglePasswordVisibility}
                >
                    {isVisiblePassword ? (
                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    )}
                </button>
            }
            isInvalid={!!error}
            errorMessage={error}
            {...(register && { ...register(name as string) })}
        />
    );
}
