// src/modules/auth/hooks/useLogin.ts
import { useState } from "react";
import AuthenticatorService from "../services/AuthenticatorService";
import { UserLogin, LoginResponse } from "../../../types/UserLogin";
import { CommonResponse } from "../../../types/CommonResponse";
import { useAuth } from "../context/AuthContext";

type UseLoginResult = {
  loginUser: (user: UserLogin) => Promise<void>;
  data: LoginResponse | null;
  error: string | null;
  loading: boolean;
};

export const useLogin = (): UseLoginResult => {
  const [data, setData] = useState<LoginResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const auth = useAuth();

  const loginUser = async (user: UserLogin): Promise<void> => {
    setLoading(true);
    setError(null);
    setData(null);  // Reiniciar data antes de la solicitud
    try {
      console.log('Attempting to log in with user:', user);
      const response: CommonResponse<LoginResponse> = await AuthenticatorService.userLogin(user);
      console.log('API response:', response);

      if (response.result.resultNumber === 0 && response.data) {
        setData(response.data);
        auth.login({
          name: response.data.agentId, // Ajusta según la estructura real
          email: user.email,
          avatarUrl: response.data.avatarUrl || undefined, // Asegúrate de que avatarUrl existe
        });
      } else {
        setError(response.result.errorMessage);
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || "Unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { loginUser, data, error, loading };
};
