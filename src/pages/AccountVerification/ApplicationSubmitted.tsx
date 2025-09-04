import { IonImg } from "@ionic/react";
import { VerificationLayout } from "../../components/Layout/VerificationLayout";
import { SolidButtonComponent } from "../../components/SolidButtonComponent";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useGetVerificationStatus } from "../../services/queries/profile-verification/profileVerificationQuery";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/reducers/authSlice";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { setGovernmentPrograms, setPersonalDetails } from "../../redux/reducers/verificationSlice";
import { setContactAddress } from "../../redux/reducers/verificationSlice";
import { setIdentityVerification } from "../../redux/reducers/verificationSlice";

export default function ApplicationSubmitted() {
    const user = useSelector((state: RootState) => state.auth.user);
    const dispatch = useDispatch();
    const history = useHistory();

    const { data } = useGetVerificationStatus({ id: user?.id as number });

    const handleBackToHome = () => {
        dispatch(updateUser({ is_verified: data }));

        history.push("/dashboard");
    };

    useEffect(() => {
        const resetVerificationData = () => {
            dispatch(setPersonalDetails(null));
            dispatch(setContactAddress(null));
            dispatch(setGovernmentPrograms(null));
            dispatch(setIdentityVerification(null));
        };
        resetVerificationData();
    }, []);
    return (
        <VerificationLayout progressBar="/assets/images/progressbar5.svg">
            <form className="flex flex-col gap-[60px] items-center mx-auto">
                <div className="flex flex-col items-center gap-[35px] text-center w-[358px]">
                    <IonImg src="/assets/images/Done 1.svg"></IonImg>
                    <div className="flex flex-col items-center gap-[5px] self-stretch">
                        <h1 className="text-[24px] font-[700]"> Your application is submitted!</h1>
                        <p className="text-[14px] text-tao-charcoal-300">
                            It may take at least 72 hours for our team to verify your account. We
                            will notify once your account is verified.{" "}
                        </p>
                    </div>
                </div>
                <div>
                    <SolidButtonComponent
                        radius="md"
                        variant="solid"
                        color="default"
                        size="md"
                        fullWidth={false}
                        buttonName="Back to Home"
                        customColor="tao-primary-red"
                        onPress={handleBackToHome}
                        isPrimaryRed={true}
                    />{" "}
                </div>
            </form>
        </VerificationLayout>
    );
}
