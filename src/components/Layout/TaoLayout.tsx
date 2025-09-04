import { IonContent, IonPage } from "@ionic/react";
import TopBar from "./TopBar";
import { motion } from "framer-motion";
import { useLocation } from "react-router";
interface TaoLayoutProps {
    children: React.ReactNode;
    pageStyle?: string;
    cssStyle?: object;
}

const pageVariants = {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 50 },
};

export function TaoLayout({ children, pageStyle, cssStyle }: TaoLayoutProps) {
    const location = useLocation();
    return (
        <motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants}>
            <IonPage>
                <IonContent fullscreen className={pageStyle} style={cssStyle}>
                    <TopBar />
                    {children}
                </IonContent>
            </IonPage>
        </motion.div>
    );
}
