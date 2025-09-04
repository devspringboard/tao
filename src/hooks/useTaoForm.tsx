import { useForm, UseFormProps } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const useTaoForm = <T extends z.ZodSchema>(
    schema: T,
    options?: UseFormProps<z.infer<typeof schema>>
) => {
    return useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        mode: "all",
        ...options,
    });
};
