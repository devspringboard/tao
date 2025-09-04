import VerificationAlert from "./VerificationAlert";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useHistory } from "react-router";
import { useUpdateUserVerification } from "../../services/mutation/profileVerificationMutation";
import { updateUser } from "../../redux/reducers/authSlice";

const UserVerificationAlert: React.FC = () => {
    const { user } = useSelector((state: RootState) => state.auth);

    const history = useHistory();
    const dispatch = useDispatch();

    const { isPending, updateUserVerification } = useUpdateUserVerification();

    const handleReverifyAccount = () => {
        updateUserVerification(
            { id: user?.id as number, is_verified: 0 },
            {
                onSuccess: (response) => {
                    dispatch(updateUser({ is_verified: response?.is_verified }));
                    history.push("/account-verification");
                },
                onError: (error) => {
                    console.log(error);
                },
            }
        );
    };

    if (!user?.is_verified) {
        return (
            <VerificationAlert
                variant="warning"
                title="Your account is not verified!"
                description="Verify your account to enjoy premium features"
                withButton={true}
                buttonText="Verify Now"
                buttonOnClick={() => {
                    history.push("/account-verification");
                }}
            />
        );
    }

    if (user?.is_verified === 2) {
        return (
            <VerificationAlert
                variant="info"
                title="Your account is under review"
                description="You will enjoy premium features soon!"
                withButton={false}
                buttonText=""
                buttonOnClick={() => {}}
            />
        );
    }

    if (user?.is_verified === 3) {
        return (
            <VerificationAlert
                variant="error"
                title="We failed to verify your account"
                description="Please check you app inbox for more details"
                withButton={true}
                buttonText="Re-apply"
                buttonOnClick={() => {
                    handleReverifyAccount();
                }}
            />
        );
    }

    return null; // No alert to render
};

export default UserVerificationAlert;
