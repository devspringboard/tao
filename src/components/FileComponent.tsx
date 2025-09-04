import { IonImg } from "@ionic/react";
import { UseFormReturn } from "react-hook-form";
import { useCallback, useState } from "react";
import { PickedFile } from "@capawesome/capacitor-file-picker";
import { FilePicker } from "@capawesome/capacitor-file-picker";
import { BorderedButtonComponent } from "./BorderedButtonComponent";

interface FileComponentProps {
    label: string;
    register?: UseFormReturn<any>["register"];
    error?: string;
    name?: string;
    setFile: (file: PickedFile[] | null) => void;
    file: PickedFile[] | null;
}

export function FileComponent({ label, setFile, file }: FileComponentProps) {
    const handleUploadFile = useCallback(async () => {
        setFile(null);

        const uploadedFile = await FilePicker.pickFiles({
            types: ["image/png", "image/jpeg", "application/pdf"],
            limit: 1,
        });

        if (uploadedFile && uploadedFile.files.length > 0) {
            //change file name
            setFile(uploadedFile.files);
        }
    }, [setFile]);

    return (
        <div className="flex flex-col gap-3">
            {/* Label & Replace Button */}
            <div className="flex items-center justify-between">
                <label className="text-[12px]">{label}</label>
                {file && (
                    <BorderedButtonComponent
                        radius="md"
                        variant="solid"
                        color="default"
                        size="md"
                        buttonName="Replace"
                        onPress={handleUploadFile}
                        fullWidth={false}
                    />
                )}
            </div>

            {file ? (
                <div className="flex flex-col p-[18px] rounded-[12px] border-1 border-tao-charcoal-000 justify-center items-center gap-[25px]">
                    <p className="text-[14px] font-medium self-stretch">{file[0].name}</p>
                    <div className="flex justify-center py-[47px] items-end gap-[10px] self-stretch bg-tao-brand-light">
                        <IonImg src={"/assets/images/Document.svg"} className="w-[64px] h-[64px]" />
                    </div>
                </div>
            ) : (
                <label
                    className="border border-dashed p-4 flex flex-col items-center gap-4 rounded-lg cursor-pointer hover:bg-gray-100"
                    onClick={handleUploadFile}
                >
                    <IonImg src={"/assets/images/Gallery Add.svg"} className="w-12 h-12" />
                    <p className="text-gray-500 text-sm text-center">
                        Drag your file here or{" "}
                        <span className="font-bold text-blue-600">Browse</span>
                    </p>
                </label>
            )}
        </div>
    );
}
