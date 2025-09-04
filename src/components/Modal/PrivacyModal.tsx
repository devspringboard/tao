import { Button } from "@heroui/button";
import { Modal, ModalBody, ModalContent } from "@heroui/modal";

interface PrivacyModalProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    onAccept: () => void;
}

const PrivacyModal = ({ isOpen, setIsOpen, onAccept }: PrivacyModalProps) => {
    const handleClose = () => {
        setIsOpen(false);
        onAccept();
    };

    return (
        <Modal isOpen={isOpen} size="2xl" onClose={handleClose} placement="center" hideCloseButton={false}>
            <ModalContent>
                <ModalBody>
                    <div className="flex flex-col py-6">
                        <div className="flex flex-col mb-6">
                            <h2 className="text-tao-primary-blue text-2xl font-bold mb-4 text-center">Privacy Policy</h2>
                            <p className="text-tao-charcoal-300 text-sm mb-6 text-center">Effective Date: August 20, 2025</p>
                        </div>

                        <div className="max-h-96 overflow-y-auto pr-2 space-y-4">
                            <p className="text-tao-charcoal-300 text-sm leading-relaxed">
                                TAO values your privacy and is committed to protecting your personal information. This Privacy Policy explains how we
                                collect, use, and safeguard your data.
                            </p>

                            <div className="space-y-3">
                                <h3 className="text-tao-primary-blue font-semibold">1. Information We Collect</h3>
                                <p className="text-tao-charcoal-300 text-sm leading-relaxed">We may collect the following types of information:</p>
                                <ul className="list-disc list-inside text-tao-charcoal-300 text-sm ml-4 space-y-1">
                                    <li>Personal details (name, birthdate, address, contact number)</li>
                                    <li>Government-issued identification numbers</li>
                                    <li>Biometric data (fingerprints, facial scans, if applicable)</li>
                                    <li>Employment and educational background</li>
                                    <li>Location data for hyperlocalized services</li>
                                    <li>Device and usage data (IP address, device model, operating system, app interactions)</li>
                                </ul>

                                <h3 className="text-tao-primary-blue font-semibold">2. How We Use Your Information</h3>
                                <p className="text-tao-charcoal-300 text-sm leading-relaxed">Your information may be used to:</p>
                                <ul className="list-disc list-inside text-tao-charcoal-300 text-sm ml-4 space-y-1">
                                    <li>Verify your identity and issue a secure digital ID</li>
                                    <li>Facilitate access to government services and aid</li>
                                    <li>Match you with job, training, and livelihood opportunities</li>
                                    <li>Send important announcements, alerts, and emergency notifications</li>
                                    <li>Analyze and improve the functionality, performance, and security of the App</li>
                                    <li>Prevent fraud, unauthorized access, or misuse of the App</li>
                                </ul>

                                <h3 className="text-tao-primary-blue font-semibold">3. Data Sharing and Disclosure</h3>
                                <p className="text-tao-charcoal-300 text-sm leading-relaxed">We may share your data with:</p>
                                <ul className="list-disc list-inside text-tao-charcoal-300 text-sm ml-4 space-y-1">
                                    <li>Government agencies, local government units, and accredited institutions for service processing</li>
                                    <li>Verified employers, training organizations, and gig platforms</li>
                                    <li>Service providers under confidentiality obligations for app maintenance and analytics</li>
                                </ul>
                                <p className="text-tao-charcoal-300 text-sm leading-relaxed">
                                    We will never sell or rent your personal data to third parties.
                                </p>

                                <h3 className="text-tao-primary-blue font-semibold">4. Cookies and Tracking</h3>
                                <p className="text-tao-charcoal-300 text-sm leading-relaxed">
                                    TAO may use cookies or similar technologies to enhance user experience, gather analytics, and personalize content.
                                    You can disable cookies in your device settings, but some features may be affected.
                                </p>

                                <h3 className="text-tao-primary-blue font-semibold">5. Data Security</h3>
                                <p className="text-tao-charcoal-300 text-sm leading-relaxed">
                                    We employ encryption, authentication, access controls, and secure storage methods to protect your data. While we
                                    strive for maximum protection, no technology can guarantee absolute security.
                                </p>

                                <h3 className="text-tao-primary-blue font-semibold">6. Data Retention</h3>
                                <p className="text-tao-charcoal-300 text-sm leading-relaxed">
                                    Your data will be retained as long as necessary to deliver services, comply with laws, or resolve disputes. When
                                    no longer needed, data will be securely deleted or anonymized.
                                </p>

                                <h3 className="text-tao-primary-blue font-semibold">7. Your Rights</h3>
                                <p className="text-tao-charcoal-300 text-sm leading-relaxed">You have the right to:</p>
                                <ul className="list-disc list-inside text-tao-charcoal-300 text-sm ml-4 space-y-1">
                                    <li>Access, correct, and update your personal information</li>
                                    <li>Request deletion of your data, subject to legal and contractual restrictions</li>
                                    <li>Withdraw consent for specific data processing</li>
                                    <li>Lodge complaints with the National Privacy Commission of the Philippines</li>
                                </ul>

                                <h3 className="text-tao-primary-blue font-semibold">8. Children's Privacy</h3>
                                <p className="text-tao-charcoal-300 text-sm leading-relaxed">
                                    TAO does not knowingly collect personal information from children under 13. If discovered, such data will be
                                    promptly deleted unless parental consent has been verified.
                                </p>

                                <h3 className="text-tao-primary-blue font-semibold">9. International Transfers</h3>
                                <p className="text-tao-charcoal-300 text-sm leading-relaxed">
                                    Although designed for use in the Philippines, some data may be processed in servers outside the country. By using
                                    the App, you consent to such transfers.
                                </p>

                                <h3 className="text-tao-primary-blue font-semibold">10. Changes to This Policy</h3>
                                <p className="text-tao-charcoal-300 text-sm leading-relaxed">
                                    We may update this Privacy Policy from time to time. Updates will be posted in the App and may be communicated via
                                    notifications or email.
                                </p>

                                <h3 className="text-tao-primary-blue font-semibold">11. Contact Information</h3>
                                <p className="text-tao-charcoal-300 text-sm leading-relaxed">
                                    If you have any questions or concerns about this Privacy Policy or your data, contact us at
                                    inquiry@springboardph.com
                                </p>
                            </div>
                        </div>

                        <div className="flex justify-center mt-6">
                            <Button
                                className="bg-tao-primary-blue font-bold text-tao-white"
                                size="md"
                                variant="solid"
                                radius="md"
                                onPress={handleClose}
                            >
                                I Understand
                            </Button>
                        </div>
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default PrivacyModal;
