import { VerificationLayout } from "../../components/Layout/VerificationLayout";
import { SelectComponent } from "../../components/SelectComponent";
import { InputComponent } from "../../components/InputComponent";
import { DateInput } from "@heroui/date-input";
import { BorderedButtonComponent } from "../../components/BorderedButtonComponent";
import { SolidButtonComponent } from "../../components/SolidButtonComponent";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTaoForm } from "../../hooks/useTaoForm";
import {
    contactAddressSchema,
    ContactAddressSchemaType,
} from "../../validations/profileVerificationSchema";
import { setContactAddress } from "../../redux/reducers/verificationSlice";
import { useEffect } from "react";
import { RootState } from "../../redux/store";

export default function ContactAddress() {
    const history = useHistory();
    const dispatch = useDispatch();
    const contactAddress = useSelector((state: RootState) => state.verification.contactAddress);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset: resetContactAddress,
    } = useTaoForm(contactAddressSchema);

    const onSubmit = (data: ContactAddressSchemaType) => {
        dispatch(setContactAddress(data));
        history.push("/government-programs");
    };

    useEffect(() => {
        if (contactAddress) {
            resetContactAddress(contactAddress);
        }
    }, []);

    return (
        <VerificationLayout progressBar="/assets/images/progressbar2.svg" title="Contact & Address">
            <form className="self-stretch h-auto" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-[10px] self-stretch">
                    <InputComponent
                        label="Street Name, Building, House No."
                        placeholder="Street Name, Building, House No."
                        type="text"
                        variant="flat"
                        color="default"
                        radius="md"
                        size="md"
                        inputStyle={{
                            label: "text-[12px]",
                        }}
                        register={register}
                        error={errors.street?.message}
                        name="street"
                    />

                    <InputComponent
                        label="Barangay"
                        placeholder="Barangay"
                        type="text"
                        variant="flat"
                        color="default"
                        radius="md"
                        size="md"
                        inputStyle={{
                            label: "text-[12px]",
                        }}
                        register={register}
                        error={errors.barangay?.message}
                        name="barangay"
                        disabled={true}
                    />

                    <InputComponent
                        label="City"
                        placeholder="City"
                        type="text"
                        variant="flat"
                        color="default"
                        radius="md"
                        size="md"
                        inputStyle={{
                            label: "text-[12px]",
                        }}
                        register={register}
                        error={errors.city?.message}
                        name="city"
                        disabled={true}
                    />

                    <InputComponent
                        label="Province"
                        placeholder="Province"
                        type="text"
                        variant="flat"
                        color="default"
                        radius="md"
                        size="md"
                        inputStyle={{
                            label: "text-[12px]",
                        }}
                        register={register}
                        error={errors.province?.message}
                        name="province"
                        disabled={true}
                    />

                    <InputComponent
                        label="Country"
                        placeholder="Country"
                        type="text"
                        variant="flat"
                        color="default"
                        radius="md"
                        size="md"
                        inputStyle={{
                            label: "text-[12px]",
                        }}
                        register={register}
                        error={errors.country?.message}
                        name="country"
                        disabled={true}
                    />

                    <InputComponent
                        label="Postal Code"
                        placeholder="0000"
                        type="Number"
                        variant="flat"
                        color="default"
                        radius="md"
                        size="md"
                        inputStyle={{
                            label: "text-[12px]",
                        }}
                        register={register}
                        error={errors.postal_code?.message}
                        name="postal_code"
                    />

                    <InputComponent
                        label="Email Address"
                        placeholder="Email Address"
                        type="email"
                        variant="flat"
                        color="default"
                        radius="md"
                        size="md"
                        inputStyle={{
                            label: "text-[12px]",
                        }}
                        register={register}
                        error={errors.email_address?.message}
                        name="email_address"
                    />

                    <InputComponent
                        label="Mobile Number"
                        placeholder="Mobile Number"
                        type="Number"
                        variant="flat"
                        color="default"
                        radius="md"
                        size="md"
                        inputStyle={{
                            label: "text-[12px]",
                        }}
                        register={register}
                        error={errors.mobile_number?.message}
                        name="mobile_number"
                    />

                    <InputComponent
                        label="Telephone Number"
                        placeholder="Telephone Number"
                        type="Number"
                        variant="flat"
                        color="default"
                        radius="md"
                        size="md"
                        inputStyle={{
                            label: "text-[12px]",
                        }}
                        register={register}
                        error={errors.telephone_number?.message}
                        name="telephone_number"
                    />
                </div>

                <div className="flex items-center gap-[50px] self-stretch mt-14">
                    <BorderedButtonComponent
                        radius="md"
                        variant="solid"
                        color="default"
                        size="md"
                        buttonName="Back"
                        onPress={() => history.goBack()}
                    />

                    <SolidButtonComponent
                        radius="md"
                        variant="solid"
                        color="default"
                        size="md"
                        buttonName="Next"
                        fullWidth={true}
                        customColor="tao-primary-blue"
                        type="submit"
                    />
                </div>
            </form>
        </VerificationLayout>
    );
}
