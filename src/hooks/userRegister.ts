import { useState } from "react";
import AuthenticatorService from "@services/AuthenticatorService";
import { LoginResponse } from "../types/UserLogin";
import { CommonResponse } from "../types/CommonResponse";

type UserRegister = {
  name: string;
  surname: string;
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
    setLoading(true);  // Inicia el estado de carga
    setError(null);    // Resetea el error antes de intentar el registro
    setData(null);     // Resetea cualquier dato previo

    try {
      // Ejecuta la llamada al servicio de registro
      const response: CommonResponse<LoginResponse> =
        await AuthenticatorService.userRegister(user);

      if (response.result.resultNumber === 0) {
        setData(response.data);  // Almacena los datos en caso de éxito
      } else {
        setError(response.result.errorMessage || "Unknown error occurred."); // Manejo de error en la respuesta
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Unexpected error occurred"); // Manejo de errores desconocidos
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false); // Finaliza el estado de carga
    }
  };

  return { register, data, error, loading };
};
