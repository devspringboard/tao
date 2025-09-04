import { App as AppCapacitor } from "@capacitor/app";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/reducers/authSlice";
import { useEffect, useState } from "react";
import { RootState } from "../../redux/store";

export const useAppCloseHandler = () => {
    const dispatch = useDispatch();
    const token = useSelector((state: RootState) => state.auth.token);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        AppCapacitor.addListener("backButton", (event) => {
            if (!event.canGoBack) {
                if (token) {
                    setIsOpen(true);
                } else {
                    AppCapacitor.exitApp();
                }
            }
        });

        return () => {
            AppCapacitor.removeAllListeners();
        };
    }, []);

    const handleLogout = () => {
        dispatch(logout());
        setIsOpen(false);
    };

    return { isOpen, setIsOpen, handleLogout };
};
