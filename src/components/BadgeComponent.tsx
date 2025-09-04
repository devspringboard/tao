import { Chip } from "@heroui/chip";

interface BadgeComponentProps {
  variant: "solid" | "bordered" | "light" | "flat" | "faded" | "shadow" | "dot";
  classNames?: object;
  title: string;
}

interface CheckIconProps {
  size?: number;
  height?: number;
  width?: number;
}

const CheckIcon = ({ size, height, width, ...props }: CheckIconProps) => {
  return (
    <svg
      fill="none"
      height={size || height || 24}
      viewBox="0 0 24 24"
      width={size || width || 24}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM16.78 9.7L11.11 15.37C10.97 15.51 10.78 15.59 10.58 15.59C10.38 15.59 10.19 15.51 10.05 15.37L7.22 12.54C6.93 12.25 6.93 11.77 7.22 11.48C7.51 11.19 7.99 11.19 8.28 11.48L10.58 13.78L15.72 8.64C16.01 8.35 16.49 8.35 16.78 8.64C17.07 8.93 17.07 9.4 16.78 9.7Z"
        fill="currentColor"
      />
    </svg>
  );
};

export function BadgeComponent({
  variant,
  classNames,
  title,
}: BadgeComponentProps) {
  return (
    <>
      <Chip
        variant={variant}
        startContent={variant === "faded" ? <CheckIcon size={18} /> : undefined}
        classNames={classNames}
      >
        {title}
      </Chip>
    </>
  );
}

{
  /* <BadgeComponent
                    variant="dot"
                    classNames={{
                        dot: "bg-tao-alert-900",
                        base: "bg-tao-alert text-tao-alert-900 border-tao-alert-200",
                    }}
                    title="Denied"
                />

                <BadgeComponent
                    variant="dot"
                    classNames={{
                        dot: "bg-tao-warning-900",
                        base: "bg-tao-warning text-tao-warning-900 border-tao-warning-300",
                    }}
                    title="Pending"
                />

                <BadgeComponent
                    variant="dot"
                    classNames={{
                        dot: "bg-tao-success-900",
                        base: "bg-tao-success text-tao-success-900 border-tao-success-300",
                    }}
                    title="Disbursed"
                />

                <BadgeComponent
                    variant="faded"
                    classNames={{
                        dot: "bg-tao-info-900",
                        base: "bg-tao-info text-tao-info-900 border-tao-info-300",
                    }}
                    title="Basic"
                /> */
}

{
  /* <BadgeComponent
          // buttonStyle="bg-tao-alert-200 border-1 border-tao-alert"
          variant="bordered"
          size="sm"
          color="default"
          radius="full"
          badgeIcon="/assets/images/Icons/tick-circle.svg"
          badgeText="Basic"
        /> */
}
