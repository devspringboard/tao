import { TaoLayout } from "../components/Layout/TaoLayout";
import { Image, useDisclosure } from "@heroui/react";
import { BadgeComponent } from "../components/BadgeComponent";
import { ProfileLinkComponent } from "../components/ProfileLinkComponent";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { UserProps } from "../types/appTypes";
import { useLogout } from "../services/mutation/authMutation";
import { useHistory } from "react-router";
import { setUser, setToken } from "../redux/reducers/authSlice";
import AlertModal from "../components/Modal/AlertModal";
import { useMemo, useState } from "react";
import UserVerificationAlert from "../components/Alerts/UserVerificationAlert";
import { AccountDialogue } from "../components/Modal/AccountDialogue";
import { ComingSoon } from "../components/Modal/ComingSoon";
import { OnProcessApplication } from "../components/Modal/OnProcessApplication";
import { useGetResidentDetails } from "../services/queries/residents/residentsQuery";

export default function Profile() {
    const { user } = useSelector((state: RootState) => state.auth) as { user: UserProps };
    const { id, full_name, email, is_verified } = user;
    const history = useHistory();
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);

    const { data } = useGetResidentDetails({ id });

    const extractDocuments = (profile: any) => ({
        selfie: `${import.meta.env.VITE_TAO_ASSETS_BASE_URL}/${profile?.selfie_verification}`,
    });

    const documents = useMemo(() => extractDocuments(data?.resident_profile_verification), [data]);

    const disclosures = {
        onProcessApplication: useDisclosure(),
        account: useDisclosure(),
        comingSoon: useDisclosure(),
        rejectApplication: useDisclosure(),
    };

    const checkIfVerified = (link: string) => {
        if (!is_verified) return disclosures.account.onOpen();
        if (is_verified === 2) return disclosures.onProcessApplication.onOpen();
        if (is_verified === 3) return disclosures.rejectApplication.onOpen();
        return history.push(link);
    };

    const comingSoon = disclosures.comingSoon.onOpen;

    const { LogOut } = useLogout();

    const handleLogout = () => {
        LogOut(undefined, {
            onSuccess: () => {
                dispatch(setUser(null));
                dispatch(setToken(null));
                history.push("/login");
            },
        });
    };

    const profileLinks = [
        {
            title: "Profile Details",
            icon: "/assets/images/Icons/Home.svg",
            link: "/resident-details",
        },
        // { title: "My QR Code", icon: "/assets/images/Icons/QR Code.svg", link: "/my-qr" },
        {
            title: "Password & Security",
            icon: "/assets/images/Profile/Lock.svg",
            link: "/change-password",
        },
        // { title: "My Trainings", icon: "/assets/images/Profile/Bolt.svg", onClick: comingSoon },
        // { title: "My Jobs", icon: "/assets/images/Profile/Bookmark.svg", onClick: comingSoon },
        { title: "Help", icon: "/assets/images/Profile/Question Circle.svg", onClick: comingSoon },
        {
            title: "Logout",
            icon: "/assets/images/Profile/Logout.svg",
            onClick: () => setIsOpen(true),
        },
    ];

    return (
        <TaoLayout>
            <div className="container flex flex-col mx-auto gap-[35px] p-[16px] items-center">
                <UserVerificationAlert />

                <div className="flex flex-col gap-[20px] items-center">
                    <Image sizes="lg" radius="full" src={documents.selfie} className="border-2 border-brand-secondary" width={70} height={70} />
                    <div className="flex flex-col gap-[10px] items-center text-center">
                        <h1 className="text-[18px] font-[700] text-tao-primary-blue">
                            {full_name}
                            <p className="font-[400] text-[14px] text-tao-charcoal-300">{email}</p>
                        </h1>

                        <BadgeComponent
                            variant="faded"
                            title={is_verified === 1 ? "Verified" : "Basic"}
                            classNames={{
                                dot: is_verified === 1 ? "bg-tao-success-900" : "bg-tao-info-900",
                                base:
                                    is_verified === 1
                                        ? "bg-tao-success text-tao-success-900 border-tao-success-300"
                                        : "bg-tao-info text-tao-info-900 border-tao-info-300",
                            }}
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-[15px] self-stretch">
                    {profileLinks.map(({ title, icon, link, onClick }) => (
                        <ProfileLinkComponent
                            key={title}
                            profileTitle={title}
                            profileIcon={icon}
                            onClick={() => (link ? checkIfVerified(link) : onClick && onClick())}
                        />
                    ))}
                </div>
            </div>

            {/* Logout Modal */}
            <AlertModal
                isOpen={isOpen}
                title="Logout"
                message="Are you sure you want to logout?"
                onConfirm={handleLogout}
                setIsOpen={setIsOpen}
                type="error"
                buttonText="Logout"
                withConfirm={true}
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

            {/* Coming Soon Modal */}
            <ComingSoon
                modalSize="sm"
                modalRadius="sm"
                modalPlacement="center"
                message="Sorry! We're still working on this"
                subMessage="This feature isn't available yet, but it's on the way."
                modalImage="assets/images/Under-Construction.svg"
                isOpen={disclosures.comingSoon.isOpen}
                onOpenChange={disclosures.comingSoon.onOpenChange}
            />

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

            <AccountDialogue
                modalSize="sm"
                modalRadius="sm"
                modalPlacement="center"
                buttonVariant="solid"
                buttonColor="primary"
                buttonRadius="sm"
                buttonSize="sm"
                buttonName="Verify Again"
                buttonVariant2="bordered"
                buttonColor2="primary"
                buttonRadius2="sm"
                buttonSize2="sm"
                buttonName2="No Thanks"
                modalImage="assets/images/Something-Went-Wrong.svg"
                message="You're not verified!"
                subMessage="Your previous application was rejected."
                isOpen={disclosures.rejectApplication.isOpen}
                setIsOpen={disclosures.rejectApplication.onOpenChange}
                onOpen={disclosures.rejectApplication.onOpen}
                onPress={() => history.push("/account-verification")}
            />
        </TaoLayout>
    );
}
