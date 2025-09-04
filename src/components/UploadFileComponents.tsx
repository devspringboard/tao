import { CameraResultType, Camera } from "@capacitor/camera";
import { IonImg } from "@ionic/react";
import { UseFormReturn } from "react-hook-form";
import { useCallback } from "react";
import { BorderedButtonComponent } from "./BorderedButtonComponent";

interface UploadFileComponentsProps {
    label: string;
    register?: UseFormReturn<any>["register"];
    error?: string;
    name?: string;
    setImage: (image: string | null) => void;
    image: string | null;
    defaultImage?: string | null;
}

export function UploadFileComponents({
    label,
    setImage,
    image,
    defaultImage,
    error,
}: UploadFileComponentsProps) {
    // Centralized function to handle camera/gallery upload
    const handleImageCapture = useCallback(async () => {
        try {
            const image = await Camera.getPhoto({
                quality: 90,
                allowEditing: false,
                resultType: CameraResultType.Uri,
                correctOrientation: true,
            });

            setImage(image.webPath ?? null);
        } catch (error) {
            console.error("Error capturing image:", error);
        }
    }, [setImage]);

    return (
        <div className="flex flex-col gap-3">
            {/* Label & Replace Button */}
            <div className="flex items-center justify-between">
                <label className="text-[12px]">{label}</label>
                {image && (
                    <BorderedButtonComponent
                        radius="md"
                        variant="solid"
                        color="default"
                        size="md"
                        buttonName="Replace"
                        onPress={handleImageCapture}
                        fullWidth={false}
                    />
                )}
            </div>

            {/* Image Preview or Upload UI */}
            {image ? (
                <img src={image} alt="Uploaded" className="w-full h-auto rounded-lg shadow" />
            ) : (
                <label
                    className="border border-dashed p-4 flex flex-col items-center gap-4 rounded-lg cursor-pointer hover:bg-gray-100"
                    onClick={handleImageCapture}
                >
                    <IonImg
                        src={defaultImage || "/assets/images/Gallery Add.svg"}
                        className="w-12 h-12"
                    />
                    <p className="text-gray-500 text-sm text-center">
                        Drag your file/image here or{" "}
                        <span className="font-bold text-blue-600">Browse</span>
                    </p>
                </label>
            )}
            {error && <p className="text-tao-primary-red text-sm text-center">{error}</p>}
        </div>
    );
}
