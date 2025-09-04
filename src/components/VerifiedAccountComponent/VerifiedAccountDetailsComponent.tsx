import { IonImg } from "@ionic/react";

interface VerifiedAccountDetailsComponentProps {
    title: string;
    content?: string;
    imageID?: string;
}
export default function VerifiedAccountDetailsComponent({
    title,
    content,
    imageID,
}: VerifiedAccountDetailsComponentProps) {
    return (
        <div>
            <h1 className="flex flex-col text-[12px] font-[400] text-tao-charcoal-300 gap-[5px]">
                {title}
                <p className="text-tao-charcoal-900 font-medium">{content}</p>
            </h1>
            <IonImg src={imageID} alt={imageID} className="shadow-md rounded-[12px]" />
        </div>
    );
}
