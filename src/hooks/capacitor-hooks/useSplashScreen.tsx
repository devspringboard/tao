// Create a new file for the custom hook
// src/hooks/useSplashScreen.ts
import { useEffect, useState } from "react";
import { SplashScreen } from "@capacitor/splash-screen";
import { useLocation } from "react-router-dom";

const useSplashScreen = () => {
    const location = useLocation();
    const [isSplashScreen, setIsSplashScreen] = useState(false);

    useEffect(() => {
        const handleSplashScreen = () => {
            setIsSplashScreen(true);
            if (location.pathname !== "/" && location.pathname !== "/dashboard") {
                SplashScreen.show({
                    autoHide: true,
                    showDuration: 1000,
                });

                setTimeout(() => {
                    setIsSplashScreen(false);
                }, 1000);
            } else {
                setIsSplashScreen(false);
            }
        };

        handleSplashScreen();
    }, [location]);

    return isSplashScreen;
};

export default useSplashScreen;
