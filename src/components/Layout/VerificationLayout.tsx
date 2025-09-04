import { IonContent, IonImg, IonPage } from "@ionic/react";
import TopBar from "./TopBar";
import { motion } from "framer-motion";
interface VerificationLayoutProps {
    children: React.ReactNode;
    pageStyle?: string;
    progressBar?: string;
    title?: string;
}

const pageVariants = {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 50 },
};

export function VerificationLayout({
    children,
    pageStyle,
    progressBar,
    title,
}: VerificationLayoutProps) {
    return (
        <motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants}>
            <IonPage>
                <IonContent fullscreen className={pageStyle}>
                    <TopBar />
                    <div className=" flex flex-col items-center pt-[40px] pb-[30px] self-stretch gap-[60px] px-[16px]">
                        <IonImg className="self-stretch" src={progressBar} />
                        <div className="flex flex-col items-start self-stretch gap-[20px]">
                            <h1 className="text-[18px] font-[700] text-tao-charcoal-900">
                                {title}
                            </h1>
                            {children}
                        </div>
                    </div>
                </IonContent>
            </IonPage>
        </motion.div>
    );
}
