import { Input } from "@heroui/react";
import { IonItem } from "@ionic/react";
import { UseFormReturn} from "react-hook-form";
import { LoginSchemaType } from "../validations/authSchema";

interface InputComponentProps{
    label: string;
    placeholder: string;
    type: string;
    variant: "flat" | "bordered" | "faded";
    color: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
    radius: "sm" | "md" | "lg" | "full";
    size: "sm" | "md" | "lg";
    inputStyle?: object;
    name?: string;
    register?: UseFormReturn<any>["register"] | undefined;
    error?: string;
    value?: string;
    disabled?: boolean;
    defaultValue?: string;
}

export function InputComponent({
    label,
    placeholder,
    type,
    variant,
    color,
    radius,
    size,
    inputStyle,
    name,
    register,
    error,
    value,
    disabled,
}: InputComponentProps) {
    return (
        <>
            <Input
                labelPlacement="outside"
                size={size}
                radius={radius}
                label={label}
                type={type}
                placeholder={placeholder}
                variant={error ? "bordered" : variant}
                color={color}
                classNames={inputStyle}
                {...(register && { ...register(name as string) })}
                isInvalid={!!error}
                errorMessage={error}
                value={value}
                disabled={disabled}
            />
        </>
    );
}
