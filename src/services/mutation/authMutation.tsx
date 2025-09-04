import { useMutation } from "@tanstack/react-query";
import { login, signup, logout, resendOTP, verifyOTP, changePassword } from "../api/auth/api";
import {
  LoginSchemaType,
  OtpSchemaType,
  SignupSchemaType,
  ChangePasswordSchemaType,
} from "../../validations/authSchema";

export const useLoginMutation = () => {
  const { isPending, mutateAsync: loginMutation } = useMutation({
    mutationFn: (payload: LoginSchemaType) => login(payload),
    mutationKey: ["login"],
  });

  return {
    isPending,
    Login: loginMutation,
  };
};

export const useResendOTP = () => {
  const { isPending, mutateAsync: resendOTPMutation } = useMutation({
    mutationFn: (payload: { user_id: number }) => resendOTP(payload),
    mutationKey: ["resendOTP"],
  });

  return {
    isPending,
    resendOTP: resendOTPMutation,
  };
};

export const useVerifyOTP = () => {
  const { isPending, mutateAsync: verifyOTPMutation } = useMutation({
    mutationFn: (payload: { user_id: number; data: OtpSchemaType }) =>
      verifyOTP(payload),
    mutationKey: ["verifyOTP"],
  });

  return {
    isPending,
    verifyOTP: verifyOTPMutation,
  };
};

//Signup Mutation
export const useSignupMutation = () => {
  const { isPending, mutateAsync: signupMutation } = useMutation({
    mutationFn: (payload: SignupSchemaType) => signup(payload),
    mutationKey: ["signup"],
  });

  return {
    isPending,
    Signup: signupMutation,
  };
};

//ChangePassword Mutation
export const useChangePasswordMutation = () => {
  const { isPending, mutateAsync: changePasswordMutation } = useMutation({
    mutationFn: (payload: ChangePasswordSchemaType) => changePassword(payload),
    mutationKey: ["changePassword"],
  });

  return {
    isPending,
    ChangePassword: changePasswordMutation,
  };
};

export const useLogout = () => {
  const { isPending, mutateAsync: logoutMutation } = useMutation({
    mutationFn: () => logout(),
    mutationKey: ["logout"],
  });

  return {
    isPending,
    LogOut: logoutMutation,
  };
};
