import api, { handleApiCall } from "../api"; // instancia Axios central
import { User } from "@/types/User";

interface AuthResponse {
  user: User;
  token: string;
}

export const loginReq = async (email: string, password: string) => {
  return handleApiCall(
    api.post<AuthResponse>("/auth/login", {
      email,
      password,
    })
  );
};

export const registerReq = async (
  name: string,
  email: string,
  password: string
) => {
  return handleApiCall(
    api.post<AuthResponse>("/auth/register", { name, email, password })
  );
};
