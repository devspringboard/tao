import { VerificationLayout } from "../../components/Layout/VerificationLayout";
import { BorderedButtonComponent } from "../../components/BorderedButtonComponent";
import { SolidButtonComponent } from "../../components/SolidButtonComponent";
import { Checkbox } from "@heroui/checkbox";
import React, { useEffect } from "react";
import { InputComponent } from "../../components/InputComponent";
import { CheckboxComponent } from "../../components/CheckBoxComponent";
import { useHistory } from "react-router-dom";
import { useTaoForm } from "../../hooks/useTaoForm";
import {
    governmentProgramsSchema,
    GovernmentProgramsSchemaType,
} from "../../validations/profileVerificationSchema";
import { setGovernmentPrograms } from "../../redux/reducers/verificationSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export default function ContactAddress() {
    const history = useHistory();
    const dispatch = useDispatch();
    const governmentPrograms = useSelector(
        (state: RootState) => state.verification.governmentPrograms
    );

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset: resetGovernmentPrograms,
        watch: watchGovernmentPrograms,
    } = useTaoForm(governmentProgramsSchema);

    const onSubmit = (data: GovernmentProgramsSchemaType) => {
        dispatch(setGovernmentPrograms(data));
        history.push("/identity-verification");
    };

    useEffect(() => {
        if (governmentPrograms) {
            resetGovernmentPrograms(governmentPrograms);
        }
    }, []);

    return (
        <VerificationLayout
            progressBar="/assets/images/progressbar3.svg"
            title="Government & Programs"
        >
            <form className="self-stretch pb-[30px]" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-[20px] self-stretch text-tao-charcoal-900 h-[550px]">
                    <CheckboxComponent
                        title="I am a Person With Disability (PWD)"
                        inputLabel="PWD ID No."
                        inputPlaceholder="Enter ID No."
                        name="is_pwd"
                        register={register}
                        error={errors.is_pwd?.message}
                    />

                    {watchGovernmentPrograms("is_pwd") && (
                        <InputComponent
                            size="md"
                            radius="md"
                            label="PWD ID No."
                            type="text"
                            placeholder="Enter ID No."
                            variant="flat"
                            color="default"
                            inputStyle={{
                                label: "text-[12px]",
                            }}
                            register={register}
                            error={errors.pwd_id_no?.message}
                            name="pwd_id_no"
                        />
                    )}

                    <CheckboxComponent
                        title="I am a Single Parent"
                        inputLabel="No. of Dependents"
                        inputPlaceholder="Enter Number of Dependents."
                        name="is_single_parent"
                        register={register}
                        error={errors.is_single_parent?.message}
                    />

                    {watchGovernmentPrograms("is_single_parent") && (
                        <InputComponent
                            size="md"
                            radius="md"
                            label="No. of Dependents"
                            type="text"
                            placeholder="Enter Number of Dependents."
                            variant="flat"
                            color="default"
                            inputStyle={{
                                label: "text-[12px]",
                            }}
                            register={register}
                            error={errors.no_of_dependents?.message}
                            name="no_of_dependents"
                        />
                    )}

                    <CheckboxComponent
                        title="I am a Senior Citizen"
                        inputLabel="ID No."
                        inputPlaceholder="Enter ID No."
                        name="is_senior_citizen"
                        register={register}
                        error={errors.is_senior_citizen?.message}
                    />

                    {watchGovernmentPrograms("is_senior_citizen") && (
                        <InputComponent
                            size="md"
                            radius="md"
                            label="ID No."
                            type="text"
                            placeholder="Enter ID No."
                            variant="flat"
                            color="default"
                            inputStyle={{
                                label: "text-[12px]",
                            }}
                            register={register}
                            error={errors.senior_citizen_id_no?.message}
                            name="senior_citizen_id_no"
                        />
                    )}
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
