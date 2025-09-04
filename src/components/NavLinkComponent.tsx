import { IonImg } from "@ionic/react";

interface NavlinkComponentProps {
  navTitle: string;
  navIcon: string;
}

export function NavLinkComponent({ navIcon, navTitle }: NavlinkComponentProps) {
  return (
    <>
      <span className="flex gap-[10px] text-[18px] font-[500] text-[#050505] px-[10px] py-[5px]">
        <IonImg src={navIcon}></IonImg>
        {navTitle}
      </span>
    </>
  );
}
