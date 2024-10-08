import { useState } from "react";
import AuthenticatorService from "../services/AuthenticatorService";
import { UserLogin, LoginResponse } from "../types/UserLogin";
import { CommonResponse } from "../types/CommonResponse";

type UseLoginResult = {
  login: (user: UserLogin) => Promise<void>;
  data: LoginResponse | null;
  error: string | null;
  loading: boolean;
};

export const useLogin = (): UseLoginResult => {
  const [data, setData] = useState<LoginResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const login = async (user: UserLogin): Promise<void> => {
    setLoading(true);
    setError(null);
    setData(null);  // Reiniciar data antes de la solicitud
    try {
      console.log('Attempting to log in with user:', user);
      const response: CommonResponse<LoginResponse> = await AuthenticatorService.userLogin(user);
      console.log('API response:', response);

      if (response.result.resultNumber === 0) {
        setData(response.data);
      } else {
        setError(response.result.errorMessage);
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || "Unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { login, data, error, loading };
};
