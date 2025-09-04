import { VerificationLayout } from "../../components/Layout/VerificationLayout";
import { SelectComponent } from "../../components/SelectComponent";
import { InputComponent } from "../../components/InputComponent";
import { BorderedButtonComponent } from "../../components/BorderedButtonComponent";
import { SolidButtonComponent } from "../../components/SolidButtonComponent";
import { useHistory } from "react-router-dom";
import { personalDetailsSchema } from "../../validations/profileVerificationSchema";
import { PersonalDetailsSchemaType } from "../../validations/profileVerificationSchema";
import { useDispatch, useSelector } from "react-redux";
import { setPersonalDetails } from "../../redux/reducers/verificationSlice";
import { RootState } from "../../redux/store";
import { useTaoForm } from "../../hooks/useTaoForm";
import { useEffect } from "react";
import {
    useGetCivilStatus,
    useGetGender,
    useGetReligions,
} from "../../services/queries/profile-verification/profileVerificationQuery";

export default function PersonalDetails() {
    const history = useHistory();
    const dispatch = useDispatch();
    const { personalDetails } = useSelector((state: RootState) => state.verification);
    const { civilStatusOptions } = useGetCivilStatus();
    const { religionsOptions } = useGetReligions();
    const { genderOptions } = useGetGender();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset: resetPersonalDetails,
    } = useTaoForm(personalDetailsSchema);

    const onSubmit = (data: PersonalDetailsSchemaType) => {
        dispatch(setPersonalDetails(data));
        history.push("/contact-address");
    };

    useEffect(() => {
        if (personalDetails) {
            resetPersonalDetails(personalDetails);
        }
    }, []);

    return (
        <VerificationLayout progressBar="/assets/images/progressbar1.svg" title="Personal Details">
            <form className="self-stretch h-auto" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-[10px] self-stretch">
                    <InputComponent
                        label="First Name"
                        placeholder="Enter First Name"
                        type="text"
                        variant="flat"
                        color="default"
                        radius="md"
                        size="md"
                        inputStyle={{
                            label: "text-[12px]",
                        }}
                        register={register}
                        error={errors.first_name?.message}
                        name="first_name"
                    />

                    <InputComponent
                        label="Middle Name"
                        placeholder="Enter Middle Name"
                        type="text"
                        variant="flat"
                        color="default"
                        radius="md"
                        size="md"
                        inputStyle={{
                            label: "text-[12px]",
                        }}
                        register={register}
                        name="middle_name"
                    />

                    <InputComponent
                        label="Last Name"
                        placeholder="Enter Last Name"
                        type="text"
                        variant="flat"
                        color="default"
                        radius="sm"
                        size="md"
                        inputStyle={{
                            label: "text-[12px]",
                        }}
                        register={register}
                        error={errors.last_name?.message}
                        name="last_name"
                    />

                    <InputComponent
                        label="Suffix"
                        placeholder="Enter Suffix"
                        type="text"
                        variant="flat"
                        color="default"
                        radius="sm"
                        size="md"
                        inputStyle={{
                            label: "text-[12px]",
                        }}
                        register={register}
                        error={errors.suffix?.message}
                        name="suffix"
                    />

                    <SelectComponent
                        label="Sex"
                        placeholder="Please Select"
                        size="md"
                        color="default"
                        inputStyle={{
                            label: "text-[12px]",
                        }}
                        register={register}
                        error={errors.sex?.message}
                        name="sex"
                        items={genderOptions}
                    />

                    <InputComponent
                        label="Birth Date"
                        placeholder="Enter Birth Date"
                        type="date"
                        variant="flat"
                        color="default"
                        radius="md"
                        size="md"
                        inputStyle={{
                            label: "text-[12px]",
                        }}
                        register={register}
                        error={errors.birth_date?.message}
                        name="birth_date"
                    />

                    <InputComponent
                        label="Birth Place"
                        placeholder="Enter Birth Place"
                        type="text"
                        variant="flat"
                        color="default"
                        radius="md"
                        size="md"
                        inputStyle={{
                            label: "text-[12px]",
                        }}
                        register={register}
                        error={errors.birth_place?.message}
                        name="birth_place"
                    />

                    <InputComponent
                        label="Nationality"
                        placeholder="Enter Nationality"
                        type="text"
                        variant="flat"
                        color="default"
                        radius="md"
                        size="md"
                        inputStyle={{
                            label: "text-[12px]",
                        }}
                        register={register}
                        error={errors.nationality?.message}
                        name="nationality"
                        disabled={true}
                    />

                    <SelectComponent
                        label="Religion"
                        placeholder="Please Select"
                        size="md"
                        color="default"
                        inputStyle={{
                            label: "text-[12px]",
                        }}
                        register={register}
                        error={errors.religion?.message}
                        name="religion"
                        items={religionsOptions}
                    />

                    <SelectComponent
                        label="Civil Status"
                        placeholder="Please Select"
                        size="md"
                        color="default"
                        inputStyle={{
                            label: "text-[12px]",
                        }}
                        register={register}
                        error={errors.civil_status?.message}
                        name="civil_status"
                        items={civilStatusOptions}
                    />

                    <InputComponent
                        label="Occupation"
                        placeholder="What is your Area of work?"
                        type="text"
                        variant="flat"
                        color="default"
                        radius="md"
                        size="md"
                        inputStyle={{
                            label: "text-[12px]",
                        }}
                        register={register}
                        name="occupation"
                        error={errors.occupation?.message}
                    />
                </div>

                <div className="flex items-center gap-[50px] self-stretch mt-14">
                    <BorderedButtonComponent
                        radius="md"
                        variant="solid"
                        color="default"
                        size="md"
                        buttonName="Cancel"
                        onPress={() => {
                            history.goBack();
                            dispatch(setPersonalDetails(null));
                        }}
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
