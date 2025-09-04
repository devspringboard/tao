import { IonImg } from "@ionic/react";
import { useState } from "react";
import StoreComponent from "./StoreComponent";
interface DropDownComponentsProps{
    title?: string;
    subTitle?: string;
    dropDownImg?: string;
}
export default function DropDownComponents({
    title,
    subTitle,
    dropDownImg,
}:DropDownComponentsProps) {
      const [dropdown, setDropdown] = useState(false)
    
  return (
    <>
      <div
        className={`flex p-[16px] justify-between items-center self-stretch ${
          dropdown
            ? "border-b-1 border-tao-charcoal-000"
            : "rounded-[8px] border-tao-charcoal-000 border-1 "
        }`}
      >
        <div className="flex items-start gap-[5px]">
          <IonImg
            src={dropDownImg}
            className="flex w-[18px] justify-center items-center"
          />
          <div className="flex flex-col self-stretch">
            <h1 className="text-tao-primary-blue text-[18px] font-[700]">
              {title}
            </h1>
            <p className="font-[400] text-tao-charcoal-300 text-[12px] w-[249px]">
              {subTitle}
            </p>
          </div>
        </div>
        <div className="ml-auto">
          <button onClick={() => setDropdown(!dropdown)}>
            <IonImg
              src={
                dropdown
                  ? "/assets/images/Alt Arrow Up.svg"
                  : "/assets/images/Alt Arrow Down.svg"
              }
            />
          </button>
        </div>{" "}
      </div>
      <div
        className={`flex flex-col items-start gap-[15px] self-stretch overflow-hidden transition-all duration-300 ease-out ${
          dropdown ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <StoreComponent
          store="7 Eleven"
          storeImg="/assets/images/7eleven.svg"
          dateTime="Open Mon-Fri 9AM-9PM"
        />
        <StoreComponent
          store="Alfamart"
          storeImg="/assets/images/alfamart.svg"
          dateTime="Open Mon-Fri 9AM-9PM"
        />
      </div>
    </>
  );
}
