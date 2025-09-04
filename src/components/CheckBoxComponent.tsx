import { Checkbox } from "@heroui/checkbox";
import { InputComponent } from "./InputComponent";
import React from "react";
import { UseFormReturn } from "react-hook-form";
interface CheckboxComponentProps {
    title: string;
    inputLabel: string;
    inputPlaceholder: string;
    name?: string;
    register?: UseFormReturn<any>["register"] | undefined;
    error?: string;
}

export function CheckboxComponent({
    title,
    inputLabel,
    inputPlaceholder,
    name,
    register,
    error,
}: CheckboxComponentProps) {
    const [isSelected, setIsSelected] = React.useState(false);

    return (
        <div className="flex flex-col gap-2">
            <Checkbox
                color="default"
                isSelected={isSelected}
                onValueChange={setIsSelected}
                {...(register && { ...register(name as string) })}
                isInvalid={!!error}
            >
                {title}{" "}
            </Checkbox>
        </div>
    );
}
