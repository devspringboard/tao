import DropDownComponents from "../../components/DropDownComponents";
import { TaoLayout } from "../../components/Layout/TaoLayout";
export default function Cashout() {
  return (
    <TaoLayout>
      <div className="container flex flex-col items-center px-[16px] py-[13px] mx-auto gap-[10px]">
        <h1 className="text-tao-charcoal-900 text-[24px] font-[500] self-stretch">
          Cashout
        </h1>

        <DropDownComponents
          title="Over the Counter"
          subTitle="Cash out at the nearest cashout partner—quick, easy, and hassle-free!"
          dropDownImg="/assets/images/verifiedTabIcon/Shop.svg"
        />
      </div>
    </TaoLayout>
  );
}
