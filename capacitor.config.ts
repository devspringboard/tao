import type { CapacitorConfig } from "@capacitor/cli";
import { KeyboardResize } from "@capacitor/keyboard";

const config: CapacitorConfig = {
    appId: "com.sbph.taoapp",
    appName: "MyTao",
    webDir: "dist",
    plugins: {
        Keyboard: {
            resize: KeyboardResize.Body,
            resizeOnFullScreen: true,
        },
        SplashScreen: {
            launchShowDuration: 1000,
            launchAutoHide: true,
            splashFullScreen: true,
            backgroundColor: "#ffffff",
            androidScaleType: "CENTER_CROP",
            splashImmersive: true,
            androidSpinnerStyle: "small",
            iosSpinnerStyle: "small",
            spinnerColor: "#072948",
        },
    },
};

export default config;
