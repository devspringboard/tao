import { IonImg } from "@ionic/react";

interface WidgetComponentProps {
    widgetTitle: string;
    widgetIcon: string;
    onClick?: () => void;
}

export function WidgetComponent({ widgetIcon, widgetTitle, onClick }: WidgetComponentProps) {
    return (
        <>
            <span
                className="flex flex-col h-[92px] min-w-[120px] max-xs:min-w-[90px]  p-[5px] justify-center items-center gap-[10px]"
                onClick={onClick}
            >
                <IonImg src={widgetIcon}></IonImg>
                <span className="text-[12px] font-[500]"> {widgetTitle}</span>
            </span>
        </>
    );
}
