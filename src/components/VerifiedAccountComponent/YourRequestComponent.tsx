import moment from "moment";
import { BadgeComponent } from "../BadgeComponent";

interface RequestComponentProps {
    requestNumber: string;
    dateTime: string;
    status: number;
    programName: string;
}

const variantStyles = (status: number) => {
    const styles: { [key: number]: { dotColor: string; baseColor: string; text: string } } = {
        1: {
            dotColor: "bg-tao-warning-900",
            baseColor: "bg-tao-warning text-tao-warning-900 border-tao-warning-300",
            text: "Pending",
        },
        2: {
            dotColor: "bg-tao-info-900",
            baseColor: "bg-tao-info text-tao-info-900 border-tao-info-200",
            text: "Awaiting for Disbursement",
        },
        3: {
            dotColor: "bg-tao-alert-900",
            baseColor: "bg-tao-alert text-tao-alert-900 border-tao-alert-300",
            text: "Rejected",
        },
        4: {
            dotColor: "bg-tao-success-900",
            baseColor: "bg-tao-success text-tao-success-900 border-tao-success-300",
            text: "Disbursed",
        },
    };

    return styles[status];
};

export default function YourRequestComponent({
    requestNumber,
    dateTime,
    status,
    programName,
}: RequestComponentProps) {
    const { dotColor, baseColor, text } = variantStyles(status);

    return (
        <>
            <div className="container flex p-[15px] items-center gap-[30px] self-stretch rounded-[12px] border-1 border-tao-charcoal-000">
                <div className="flex flex-col items-start content-center flex-wrap text-tao-charcoal-700 font-[700] gap-[3px]">
                    <h1>{requestNumber}</h1>
                    <h1>{programName}</h1>
                    <p className="text-tao-charcoal-300 text-[12px] font-[400]">
                        {moment(dateTime).format("LL")}
                    </p>
                </div>
                <div className="ml-auto">
                    <BadgeComponent
                        variant="dot"
                        title={text}
                        classNames={{
                            dot: dotColor,
                            base: baseColor,
                        }}
                    />
                </div>
            </div>
        </>
    );
}
