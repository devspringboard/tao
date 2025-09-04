import { IonImg } from "@ionic/react";
import { TaoLayout } from "../../components/Layout/TaoLayout";
import NotificationComponent from "../../components/NotificationComponent";
export default function Dashboard() {
    return (
        <TaoLayout>
            <div className="container mx-auto flex flex-col px-[16px] py-[13px]">
                <div className="flex flex-col gap-[20px]">
                    <h1 className="text-tao-charcoal-900 text-[24px] font-[500]">Inbox</h1>
                    {/* 
                    <div className="flex flex-col gap-[5px]">
                        <NotificationComponent
                            image="/assets/images/Badges.svg"
                            title="Request has been disbursed!"
                            subTitle="Livelihood Assistance "
                            dateTime="Jan 25, 1:45 PM"
                        />
                        <NotificationComponent
                            image="/assets/images/Badges2.svg"
                            title="Request is under review"
                            subTitle="Livelihood Assistance "
                            dateTime="Jan 25, 1:45 PM"
                        />
                        <NotificationComponent
                            image="/assets/images/Badges3.svg"
                            title="Request has been submitted!"
                            subTitle="Livelihood Assistance "
                            dateTime="Jan 25, 1:45 PM"
                        />
                        <NotificationComponent
                            image="/assets/images/Badges4.svg"
                            title="Request is denied!"
                            subTitle="Livelihood Assistance "
                            dateTime="Jan 25, 1:45 PM"
                        />
                    </div> */}
                    <div className="flex flex-col py-[100px] justify-center items-center gap-[5px]">
                        <IonImg src="/assets/images/No-Message.svg"></IonImg>
                        <p className="text-[14px] font-[500] text-tao-charcoal-900">
                            You have no new messages
                        </p>
                    </div>
                </div>
            </div>
        </TaoLayout>
    );
}
