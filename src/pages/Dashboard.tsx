import { TaoLayout } from "../components/Layout/TaoLayout";
import { BadgeComponent } from "../components/BadgeComponent";
import DashboardWidget from "../components/WidgetgetsComponents/DashboardWidget";
import { IonImg } from "@ionic/react";
import { SelectComponent } from "../components/SelectComponent";
import WalletCardComponent from "../components/WalletCardComponent";
import SearchComponent from "../components/SearchComponent";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import UserVerificationAlert from "../components/Alerts/UserVerificationAlert";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useGetVerificationStatus } from "../services/queries/profile-verification/profileVerificationQuery";
import { useDispatch } from "react-redux";
import { updateUser } from "../redux/reducers/authSlice";
import { useDisclosure } from "@heroui/modal";
import { VerifiedApplication } from "../components/Modal/VerifiedApplication";
import YourRequestComponent from "../components/VerifiedAccountComponent/YourRequestComponent";
import { useGetResidentApplicationHistory } from "../services/queries/financial-assistance/financialAssistanceQuery";
import { AccountDialogue } from "../components/Modal/AccountDialogue";
import { OnProcessApplication } from "../components/Modal/OnProcessApplication";

export default function Dashboard() {
    const { user } = useSelector((state: RootState) => state.auth);
    const history = useHistory();
    const dispatch = useDispatch();

    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");
    const disclosures = {
        verified: useDisclosure(),
        account: useDisclosure(),
        onProcessApplication: useDisclosure(),
    };

    if (!user?.email_verified_at) {
        history.push("/verify-otp");
    }

    const checkIfVerified = (link: string) => {
        if (!user?.is_verified) {
            return disclosures.account.onOpen();
        }

        if (user?.is_verified === 2) {
            return disclosures.onProcessApplication.onOpen();
        }

        if (user?.is_verified === 3) {
            return disclosures.account.onOpen();
        }

        return history.push(link);
    };

    const { data, refetch: refetchVerificationStatus } = useGetVerificationStatus({
        id: user?.id as number,
    });

    const { data: assistanceHistory, refetch: refetchAssistance } = useGetResidentApplicationHistory();

    const filterAssistanceHistory = (item: any) => {
        const searchLower = search.toLowerCase();
        const matchesSearch = item.request_number.toLowerCase().includes(searchLower) || item.program_name.toLowerCase().includes(searchLower);

        return filter === "all" ? matchesSearch : parseInt(item.status) === parseInt(filter) && matchesSearch;
    };

    const filteredAssistanceHistory = assistanceHistory?.filter(filterAssistanceHistory);

    useEffect(() => {
        if (user?.is_verified !== 1) {
            refetchVerificationStatus();
        }
        if (data) {
            dispatch(updateUser({ is_verified: data?.is_verified }));

            if (data?.is_verified === 1 && localStorage.getItem("isVerified") !== "true") {
                disclosures.verified.onOpen();
                localStorage.setItem("isVerified", "true");
            }
        }
    }, [data, user?.is_verified]);

    return (
        <TaoLayout>
            <div className="container flex flex-col mx-auto gap-[35px] p-[16px]">
                <UserVerificationAlert />

                <WalletCardComponent />

                <div className="flex self-stretch justify-end">
                    <h1 className="text-tao-primary-blue mr-auto text-[24px] font-[700]">
                        {user?.full_name}
                        <p className="text-[12px] text-tao-charcoal-300 font-[400]">{user?.email}</p>
                    </h1>

                    <BadgeComponent
                        variant="faded"
                        title={user?.is_verified === 1 ? "Verified" : "Basic"}
                        classNames={{
                            dot: user?.is_verified === 1 ? "bg-tao-success-900" : "bg-tao-info-900",
                            base:
                                user?.is_verified === 1
                                    ? "bg-tao-success text-tao-success-900 border-tao-success-300"
                                    : "bg-tao-info text-tao-info-900 border-tao-info-300",
                        }}
                    />
                </div>

                <DashboardWidget />

                <IonImg className="lg:w-[1000px] lg:mx-auto" src="/assets/images/image 8.svg"></IonImg>

                <div className="flex flex-col items-center justify-center gap-[20px] self-stretch">
                    <div className="flex justify-between items-center self-stretch">
                        <h1 className="text-tao-charcoal-900 text-[24px] font-[500]">Your Requests</h1>
                        {/* <button
                            onClick={() => checkIfVerified("/financial-assistance")}
                            className="bg-tao-primary-blue text-tao-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Request Ayuda
                        </button> */}
                    </div>

                    <SearchComponent search={search} setSearch={setSearch} />

                    <SelectComponent
                        label=""
                        placeholder="Filter"
                        size="sm"
                        color="default"
                        inputStyle={{
                            label: "text-[12px]",
                        }}
                        defaultSelected={filter}
                        items={[
                            {
                                label: "All",
                                value: "all",
                            },
                            {
                                label: "Pending",
                                value: "1",
                            },
                            {
                                label: "Awaiting for Disbursement",
                                value: "2",
                            },
                            {
                                label: "Rejected",
                                value: "3",
                            },
                            {
                                label: "Disbursed",
                                value: "4",
                            },
                        ]}
                        onChange={(value) => {
                            setFilter(value);
                        }}
                        value={filter}
                    />

                    {filteredAssistanceHistory?.length > 0 ? (
                        filteredAssistanceHistory?.map((item: any) => (
                            <YourRequestComponent
                                key={`${item.request_number}-${item.program_name}`}
                                requestNumber={item.request_number}
                                dateTime={item.created_at}
                                status={parseInt(item.status)}
                                programName={item.program_name}
                            />
                        ))
                    ) : (
                        <p className="py-[50px] text-tao-charcoal-300 font-[400] text-[14px]">You have no request yet</p>
                    )}
                </div>
            </div>

            <VerifiedApplication
                modalSize="sm"
                modalRadius="sm"
                modalPlacement="center"
                message="You are now verified user!"
                subMessage="Enjoy your unlimited access to premium features"
                modalImage="assets/images/Verified.svg"
                isOpen={disclosures.verified.isOpen}
                onOpenChange={disclosures.verified.onOpenChange}
            />

            {/* Account Verification Modal */}
            <AccountDialogue
                modalSize="sm"
                modalRadius="sm"
                modalPlacement="center"
                buttonVariant="solid"
                buttonColor="primary"
                buttonRadius="sm"
                buttonSize="sm"
                buttonName="Verify Now"
                buttonVariant2="bordered"
                buttonColor2="primary"
                buttonRadius2="sm"
                buttonSize2="sm"
                buttonName2="No Thanks"
                modalImage="assets/images/Something-Went-Wrong.svg"
                message="You are not verified!"
                subMessage="Verify your account to enjoy premium features"
                isOpen={disclosures.account.isOpen}
                setIsOpen={disclosures.account.onOpenChange}
                onOpen={disclosures.account.onOpen}
                onPress={() => history.push("/account-verification")}
            />

            {/* On Process Application Modal */}
            <OnProcessApplication
                modalSize="sm"
                modalRadius="sm"
                modalPlacement="center"
                message="Your application is still on process"
                subMessage="Your account is still being processed for verification."
                modalImage="assets/images/Waiting.svg"
                isOpen={disclosures.onProcessApplication.isOpen}
                onOpenChange={disclosures.onProcessApplication.onOpenChange}
            />
        </TaoLayout>
    );
}
