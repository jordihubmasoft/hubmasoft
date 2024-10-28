import { useState } from "react";
import AuthenticatorService from "../services/AuthenticatorService";
import { UserLogin, LoginResponse } from "../../../types/UserLogin";
import { CommonResponse } from "../../../types/CommonResponse";


export const useSendResetPasswordEmail = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendResetPasswordEmail = async (email: string): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      // Llama al método recién agregado en AuthenticatorService
      await AuthenticatorService.sendResetPasswordEmail(email);
    } catch (err) {
      setError(err.message || "Ocurrió un error al enviar el correo de recuperación de contraseña");
    } finally {
      setLoading(false);
    }
  };

  return { sendResetPasswordEmail, loading, error };
};


type UseResetPasswordResult = {
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  error: string | null;
  loading: boolean;
};

export const useResetPassword = (): UseResetPasswordResult => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const resetPassword = async (token: string, newPassword: string): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      // Llamar al método de AuthenticatorService para resetear la contraseña
      await AuthenticatorService.resetPassword(token, newPassword);
    } catch (err) {
      console.error('Reset password error:', err);
      setError(err.message || "Unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { resetPassword, error, loading };
};
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
