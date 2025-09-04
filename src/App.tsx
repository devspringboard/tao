import { Redirect, Route, useHistory, useLocation } from "react-router-dom";
import { IonApp, IonRouterOutlet, IonTabs, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Signup from "./pages/Auth/Signup";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
// import "@ionic/react/css/palettes/dark.system.css";

/* Theme variables */
import "./theme/variables.css";
import Login from "./pages/Auth/Login";
import Otp from "./pages/Auth/Otp";
import Navigation from "./pages/Navigation";
import Dashboard from "./pages/Dashboard";
import Inbox from "./pages/AccountVerification/Inbox";
import GovernmentPrograms from "./pages/AccountVerification/GovernmentPrograms";
import ContactAddress from "./pages/AccountVerification/ContactAddress";
import AccountVerification from "./pages/AccountVerification/AccountVerification";
import PersonalDetails from "./pages/AccountVerification/PersonalDetails";
import IdentityVerification from "./pages/AccountVerification/IdentityVerification";
import ApplicationSubmitted from "./pages/AccountVerification/ApplicationSubmitted";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import TabBar from "./components/Layout/TabBar";
import { AnimatePresence } from "framer-motion";
import FinancialAssistance from "./pages/Assitance/FinancialAssistance";
import Profile from "./pages/Profile";
import MyQR from "./pages/VerifiedAccount/MyQR";
import VerifiedPersonalDetails from "./pages/VerifiedAccount/VerifiedPersonalDetails";
import VerifiedContacts from "./pages/VerifiedAccount/VerifiedContacts";
import VerifiedGovernmentPrograms from "./pages/VerifiedAccount/VerifiedGovernmentPrograms";
import VerifiedDocuments from "./pages/VerifiedAccount/VerifiedDocuments";
import Cashout from "./pages/VerifiedAccount/Cashout";
import { useAppCloseHandler } from "./hooks/capacitor-hooks/useAppCloseHandler";
import AlertModal from "./components/Modal/AlertModal";
import { SplashScreen } from "@capacitor/splash-screen";
import useSplashScreen from "./hooks/capacitor-hooks/useSplashScreen";
import ChangePassword from "./pages/Auth/ChangePassword";
import UploadRequest from "./pages/Assitance/UploadRequest";
import SupportingDocuments from "./pages/Assitance/SupportingDocuments";
setupIonicReact();

const RedirectIfAuthenticated: React.FC<{
    to: string;
    children: React.ReactNode;
}> = ({ to, children }) => {
    const token = useSelector((state: RootState) => state.auth.token);
    return token ? <Redirect to={to} /> : <>{children}</>;
};

const ProtectedRoute: React.FC<{
    component: React.FC;
    path: string;
    exact?: boolean;
    isVerificationScreen?: boolean;
}> = ({ component: Component, path, exact = false }) => {
    const { token } = useSelector((state: RootState) => state.auth);
    // Conditional logic before returning JSX
    const renderComponent = () => {
        return token ? <Component /> : <Redirect to="/login" />;
    };

    return (
        <>
            <Route
                path={path}
                exact={exact}
                render={renderComponent} // Use the function here instead of inline logic
            />
        </>
    );
};

const App: React.FC = () => {
    const token = useSelector((state: RootState) => state.auth.token);
    const { isOpen, setIsOpen, handleLogout } = useAppCloseHandler();

    return (
        <IonApp>
            <IonReactRouter>
                <AnimatePresence mode="wait">
                    <IonTabs>
                        <IonRouterOutlet animated={false}>
                            <RedirectIfAuthenticated to="/dashboard">
                                <Route exact path="/signup">
                                    <Signup />
                                </Route>
                                <Route exact path="/login">
                                    <Login />
                                </Route>
                            </RedirectIfAuthenticated>

                            <ProtectedRoute path="/verify-otp" component={Otp} />
                            <ProtectedRoute path="/dashboard" component={Dashboard} />
                            <ProtectedRoute
                                path="/account-verification"
                                component={AccountVerification}
                            />
                            <ProtectedRoute path="/personal-details" component={PersonalDetails} />
                            <ProtectedRoute path="/contact-address" component={ContactAddress} />
                            <ProtectedRoute
                                path="/government-programs"
                                component={GovernmentPrograms}
                            />
                            <ProtectedRoute
                                path="/identity-verification"
                                component={IdentityVerification}
                            />
                            <ProtectedRoute
                                path="/application-submitted"
                                component={ApplicationSubmitted}
                            />
                            <ProtectedRoute path="/profile" component={Profile} />
                            <ProtectedRoute path="/inbox" component={Inbox} />
                            <ProtectedRoute path="/my-qr" component={MyQR} />
                            <ProtectedRoute
                                path="/financial-assistance"
                                component={FinancialAssistance}
                            />
                            <ProtectedRoute
                                path="/assistance-documents/:id"
                                component={UploadRequest}
                            />
                            <ProtectedRoute
                                path="/supporting-documents"
                                component={SupportingDocuments}
                            />
                            <ProtectedRoute
                                path="/resident-details"
                                component={VerifiedPersonalDetails}
                            />
                            <ProtectedRoute path="/contact-details" component={VerifiedContacts} />
                            <ProtectedRoute
                                path="/government-details"
                                component={VerifiedGovernmentPrograms}
                            />
                            <ProtectedRoute
                                path="/uploaded-documents"
                                component={VerifiedDocuments}
                            />
                            <ProtectedRoute path="/cashout" component={Cashout} />
                            <ProtectedRoute path="/change-password" component={ChangePassword} />

                            <Route exact path="/">
                                <Redirect to="/login" />
                            </Route>
                        </IonRouterOutlet>

                        {token && <TabBar />}
                    </IonTabs>
                </AnimatePresence>
            </IonReactRouter>

            {/* Render the logout modal here */}
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
        </IonApp>
    );
};

export default App;
