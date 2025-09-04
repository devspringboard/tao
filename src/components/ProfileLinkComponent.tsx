import { IonImg } from "@ionic/react";

interface ProfilelinkComponentProps {
    profileTitle: string;
    profileIcon: string;
    onClick?: () => void;
}

export function ProfileLinkComponent({
    profileIcon,
    profileTitle,
    onClick,
}: ProfilelinkComponentProps) {
    return (
        <>
            <span
                className="flex gap-[10px] text-[18px] font-[500] text-[#050505] px-[10px] py-[5px] border-b-1 border-tao-charcoal-000"
                onClick={onClick}
            >
                <IonImg src={profileIcon}></IonImg>
                {profileTitle}
            </span>
        </>
    );
}
