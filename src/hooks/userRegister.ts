import { useState } from "react";
import AuthenticatorService from "@services/AuthenticatorService";
import { LoginResponse } from "../types/UserLogin";
import { CommonResponse } from "../types/CommonResponse";

type UserRegister = {
  username: string;
  email: string;
  password: string;
};

type UseRegisterResult = {
  register: (user: UserRegister) => Promise<void>;
  data: LoginResponse | null;
  error: string | null;
  loading: boolean;
};

export const useRegister = (): UseRegisterResult => {
  const [data, setData] = useState<LoginResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const register = async (user: UserRegister): Promise<void> => {
    setLoading(true);
    setError(null); // Reset error state before attempting registration
    try {
      const response: CommonResponse<LoginResponse> =
        await AuthenticatorService.userRegister(user);
      if (response.result.resultNumber === 0) {
        setData(response.data); // Set data on success
      } else {
        setError(response.result.errorMessage || "Unknown error occurred."); // Handle error
      }
    } catch (err) {
      setError(err.message || "Unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { register, data, error, loading };
};
