import { IonImg } from '@ionic/react'
interface StoreComponentProps{
    storeImg?: string;
    store?: string;
    dateTime?: string;
}
export default function StoreComponent({
    storeImg,
    store,
    dateTime,
}: StoreComponentProps) {
  return   <div className="flex gap-[10px] pl-[20px] items-center self-stretch">
                      <IonImg src={storeImg} alt={storeImg}></IonImg>
                      <h1 className="flex flex-col text-[14px] font-[500] text-tao-charcoal-900">
                        {store} <p className="font-[400] text-tao-charcoal-300">{dateTime}</p>
                      </h1>
                    </div>
}
