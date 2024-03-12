import { SIGN_UP } from "../constants";
import { getIsEmailAvailable } from "./api";

const isEmailValid = email => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export const getEmailErrors = async (email, authType) => {
  if (!isEmailValid(email)) return "Invalid email";
  console.log(authType)
  if (authType !== SIGN_UP) return;

  const response = await getIsEmailAvailable(email);
  
  if (response.data.isAvailable) return;
  return "Email unavailable";
}

export const getPasswordErrors = password => {
  if (password.length < 6) {
    return "Password must be at least 6 characters";
  }
}