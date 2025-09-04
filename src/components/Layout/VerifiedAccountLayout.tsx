import { IonContent, IonImg, IonPage } from "@ionic/react";
import TopBar from "./TopBar";
import { motion } from "framer-motion";
interface VerifiedAccountLayoutProps {
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

export function VerifiedAccountLayout({
  children,
  pageStyle,

}: VerifiedAccountLayoutProps) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <IonPage>
        <IonContent fullscreen className={pageStyle}>
          <TopBar />
          <div className=" flex flex-col items-center pt-[40px] pb-[30px] self-stretch  px-[16px]">
              {children}
          </div>
        </IonContent>
      </IonPage>
    </motion.div>
  );
}
