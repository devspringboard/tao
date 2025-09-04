import { IonImg } from "@ionic/react";
import { SolidButtonComponent } from "./SolidButtonComponent";

interface RequestComponentProps {
    image: string | undefined;
    title: string;
    content: string;
    handleAssistance?: () => void;
}

export function RequestComponent({
    image,
    title,
    content,
    handleAssistance,
}: RequestComponentProps) {
    return (
        <div className="flex flex-col py-[25px] px-[16px] min-w-[358px] gap-[15px] items-start rounded-[12px] border-1 border-tao-charcoal-000">
            <IonImg src={image} />
            <div className="flex flex-col gap-[20px] py-[10px] items-start self-stretch">
                <h1 className="flex flex-col gap-[5px] text-[24px] font-[700] text-tao-primary-blue self-stretch">
                    {title}
                    <p className="text-[14px] text-tao-charcoal-500 font-[400] self-stretch w-80">
                        {content}
                    </p>
                </h1>
                <div>
                    <SolidButtonComponent
                        radius="md"
                        variant="solid"
                        color="default"
                        size="md"
                        fullWidth={false}
                        buttonName="Submit Request"
                        customColor="tao-primary-red"
                        isPrimaryRed={true}
                        onPress={handleAssistance}
                    />
                </div>
            </div>
        </div>
    );
}
