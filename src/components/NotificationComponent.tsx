import { Badge } from "@heroui/badge";
import { Avatar } from "@heroui/react";

interface NotificationComponentProps {
  image: string;
  title: string;
  subTitle: string;
  dateTime: string;
  bgColor?: string;
}

export default function NotificationComponent({
  image,
  title,
  subTitle,
  dateTime,
  bgColor,
}: NotificationComponentProps) {
  return (
    <>
      <div className="flex flex-col p-[16px] items-center gap-[5px] self-stretch border-[1px] border-tao-charcoal-000 rounded-[12px]">
        <div className="flex gap-[10px]">
          <Badge color="primary">
            <Avatar
              radius="full"
              size="md"
              src={image}
              className={`bg-[${bgColor}]`}
            />
          </Badge>{" "}
          <div className="flex flex-col gap-[5px]">
            <h1 className="flex flex-col min-w-[300px] items-start gap-[5px] font-[500] text-[14px] text-tao-charcoal-900">
              {title}
              <p className="font-[400px] text-[14px] text-tao-charcoal-500">
                {subTitle}
              </p>
            </h1>
            <p className="text-tao-charcoal-300 text-[12px] font-[400px]">
              {dateTime}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
