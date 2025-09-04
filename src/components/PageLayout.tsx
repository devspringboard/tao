import { IonContent, IonPage } from "@ionic/react";

interface PageLayoutProps {
  children: React.ReactNode;
  pageStyle?: string;
}

export function PageLayout({ children, pageStyle }: PageLayoutProps) {
  return (
    <IonPage>
      <IonContent fullscreen className={pageStyle}>
        {children}
      </IonContent>
    </IonPage>
  );
}
