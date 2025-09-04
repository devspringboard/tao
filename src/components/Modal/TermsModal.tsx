import { Button } from "@heroui/button";
import { Modal, ModalBody, ModalContent } from "@heroui/modal";

interface TermsModalProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    onAccept: () => void;
}

const TermsModal = ({ isOpen, setIsOpen, onAccept }: TermsModalProps) => {
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
                            <h2 className="text-tao-primary-blue text-2xl font-bold mb-4 text-center">Terms and Conditions</h2>
                            <p className="text-tao-charcoal-300 text-sm mb-6 text-center">Effective Date: August 20, 2025</p>
                        </div>

                        <div className="max-h-96 overflow-y-auto pr-2 space-y-4">
                            <p className="text-tao-charcoal-300 text-sm leading-relaxed">
                                Welcome to TAO - Trabaho at Oportunidad ("TAO App"), a hyperlocalized mobile platform designed to provide Filipinos
                                with secure digital IDs and instant access to government services, financial aid, training, gig jobs, and local
                                announcements.
                            </p>

                            <p className="text-tao-charcoal-300 text-sm leading-relaxed">
                                By downloading, installing, or using the TAO App, you agree to comply with and be bound by the following Terms and
                                Conditions. Please read them carefully.
                            </p>

                            <div className="space-y-3">
                                <h3 className="text-tao-primary-blue font-semibold">1. Acceptance of Terms</h3>
                                <p className="text-tao-charcoal-300 text-sm leading-relaxed">
                                    By using the TAO App, you confirm that you are at least 18 years old or have the consent of a parent/guardian if
                                    under 18. If you do not agree with these Terms, please do not use the App.
                                </p>

                                <h3 className="text-tao-primary-blue font-semibold">2. Services Provided</h3>
                                <p className="text-tao-charcoal-300 text-sm leading-relaxed">TAO provides access to:</p>
                                <ul className="list-disc list-inside text-tao-charcoal-300 text-sm ml-4 space-y-1">
                                    <li>Secure digital identification</li>
                                    <li>Government services and announcements</li>
                                    <li>Financial aid applications and disbursements</li>
                                    <li>Trainings and educational opportunities</li>
                                    <li>Gig jobs and livelihood opportunities</li>
                                </ul>
                                <p className="text-tao-charcoal-300 text-sm leading-relaxed">
                                    We may update, modify, or discontinue features at any time without prior notice.
                                </p>

                                <h3 className="text-tao-primary-blue font-semibold">3. Eligibility</h3>
                                <p className="text-tao-charcoal-300 text-sm leading-relaxed">
                                    You must be a resident of the Philippines to use TAO. Some services may require specific eligibility criteria
                                    defined by government agencies.
                                </p>

                                <h3 className="text-tao-primary-blue font-semibold">4. User Responsibilities</h3>
                                <ul className="list-disc list-inside text-tao-charcoal-300 text-sm ml-4 space-y-1">
                                    <li>Provide accurate, complete, and up-to-date information.</li>
                                    <li>Keep your login credentials and devices secure.</li>
                                    <li>Refrain from any fraudulent, abusive, or unauthorized use of the App.</li>
                                    <li>Use TAO only for lawful purposes and in accordance with community guidelines.</li>
                                </ul>

                                <h3 className="text-tao-primary-blue font-semibold">5. Account Registration</h3>
                                <p className="text-tao-charcoal-300 text-sm leading-relaxed">
                                    You may need to register for a TAO account to access certain features. You are solely responsible for activities
                                    conducted under your account. TAO reserves the right to suspend or reject registration if information provided is
                                    false or misleading.
                                </p>

                                <h3 className="text-tao-primary-blue font-semibold">6. Digital ID Usage</h3>
                                <p className="text-tao-charcoal-300 text-sm leading-relaxed">
                                    The digital ID provided by TAO may serve as proof of identity in partner agencies. You agree not to misuse, forge,
                                    or share your digital ID in a way that compromises its integrity.
                                </p>

                                <h3 className="text-tao-primary-blue font-semibold">7. Data Security and Confidentiality</h3>
                                <p className="text-tao-charcoal-300 text-sm leading-relaxed">
                                    We use industry-standard measures, including encryption and secure servers, to protect your data. However, no
                                    system is completely secure, and we cannot guarantee absolute protection from unauthorized access.
                                </p>

                                <h3 className="text-tao-primary-blue font-semibold">8. Third-Party Services</h3>
                                <p className="text-tao-charcoal-300 text-sm leading-relaxed">
                                    The App may link to or integrate with third-party services (e.g., training providers, gig job platforms). TAO is
                                    not responsible for the content, policies, or performance of third-party services.
                                </p>

                                <h3 className="text-tao-primary-blue font-semibold">9. Intellectual Property</h3>
                                <p className="text-tao-charcoal-300 text-sm leading-relaxed">
                                    All content, trademarks, and features within the App are the property of TAO or its licensors. Unauthorized
                                    copying, distribution, or modification is prohibited.
                                </p>

                                <h3 className="text-tao-primary-blue font-semibold">10. Limitation of Liability</h3>
                                <p className="text-tao-charcoal-300 text-sm leading-relaxed">
                                    TAO shall not be held liable for any direct, indirect, incidental, or consequential damages arising from:
                                </p>
                                <ul className="list-disc list-inside text-tao-charcoal-300 text-sm ml-4 space-y-1">
                                    <li>Errors or interruptions in service</li>
                                    <li>Unauthorized access to data</li>
                                    <li>Service delays or unavailability</li>
                                    <li>Decisions made based on information accessed through the App</li>
                                </ul>

                                <h3 className="text-tao-primary-blue font-semibold">11. Indemnification</h3>
                                <p className="text-tao-charcoal-300 text-sm leading-relaxed">
                                    You agree to indemnify and hold TAO, its affiliates, and partners harmless from any claims, liabilities, damages,
                                    or expenses resulting from your misuse of the App.
                                </p>

                                <h3 className="text-tao-primary-blue font-semibold">12. Termination</h3>
                                <p className="text-tao-charcoal-300 text-sm leading-relaxed">
                                    We reserve the right to suspend, limit, or terminate your access to the App if you violate these Terms, misuse
                                    services, or engage in fraudulent activity.
                                </p>

                                <h3 className="text-tao-primary-blue font-semibold">13. Amendments</h3>
                                <p className="text-tao-charcoal-300 text-sm leading-relaxed">
                                    TAO may revise these Terms at any time. Changes will be communicated via the App or through your registered email.
                                    Continued use after changes signifies acceptance.
                                </p>

                                <h3 className="text-tao-primary-blue font-semibold">14. Governing Law</h3>
                                <p className="text-tao-charcoal-300 text-sm leading-relaxed">
                                    These Terms are governed by the laws of the Republic of the Philippines. Disputes shall be resolved in the proper
                                    courts of Quezon City, Philippines.
                                </p>

                                <p className="text-tao-charcoal-300 text-sm leading-relaxed">
                                    By using the TAO App, you agree to the above Terms and Conditions. If you have any concerns, contact
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

export default TermsModal;
