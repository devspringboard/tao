import axiosClient from "../axios";
import {
  LoginSchemaType,
  OtpSchemaType,
  SignupSchemaType,
  ChangePasswordSchemaType,
} from "../../../validations/authSchema";

export const login = (data: LoginSchemaType) => {
  return axiosClient.post("/residents/login", data);
};

export const resendOTP = ({ user_id }: { user_id: number }) => {
  return axiosClient.post("/residents/generate-otp", { user_id });
};

export const verifyOTP = ({
  user_id,
  data,
}: {
  user_id: number;
  data: OtpSchemaType;
}) => {
  return axiosClient.put(`/residents/${user_id}/verify-otp`, data);
};

export const signup = (data: SignupSchemaType) => {
  return axiosClient.post("/residents/signup", data);
};

export const changePassword = (data: ChangePasswordSchemaType) => {
  return axiosClient.post("/residents/change-password", data);
};

export const logout = () => {
  return axiosClient.post("/residents/logout");
};
