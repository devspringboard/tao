import { Select, SelectItem } from "@heroui/react";
import { UseFormReturn } from "react-hook-form";

interface SelectComponentProps {
    label: string;
    placeholder: string;
    size: "sm" | "md" | "lg";
    color: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
    inputStyle?: object;
    fullWidth?: boolean;
    name?: string;
    register?: UseFormReturn<any>["register"] | undefined;
    error?: string;
    items?: { label: string; value: string }[];
    value?: string;
    onChange?: (value: string) => void;
    defaultSelected?: string;
}

export function SelectComponent({
    label,
    placeholder,
    size,
    color,
    inputStyle,
    fullWidth,
    name,
    register,
    error,
    items,
    value,
    onChange,
    defaultSelected,
}: SelectComponentProps) {
    return (
        <>
            <Select
                items={items}
                label={label}
                size={size}
                placeholder={placeholder}
                color={color}
                labelPlacement="outside"
                classNames={inputStyle}
                fullWidth={fullWidth}
                name={name}
                {...(register && { ...register(name as string) })}
                isInvalid={!!error}
                errorMessage={error}
                aria-label={`select-${label}`}
                {...(defaultSelected && { defaultSelectedKeys: [`${defaultSelected}`] })}
                {...(value && { value: `${value}` })}
                {...(onChange && { onChange: (e) => onChange?.(e.target.value) })}
            >
                {items?.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                        {item.label}
                    </SelectItem>
                )) || null}
            </Select>
        </>
    );
}
