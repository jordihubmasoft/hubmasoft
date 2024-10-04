import { useState } from 'react';
import { UserLogin, LoginResponse } from '../types/UserLogin';
import AuthenticatorService from '@services/AuthenticatorService'; // Usa el mismo servicio que para el registro
import { CommonResponse } from '../types/CommonResponse'; // Similar a la lógica en el registro

export const useLogin = () => {
  const [data, setData] = useState<LoginResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const login = async (user: UserLogin): Promise<void> => {
    setLoading(true);
    setError(null);
    setData(null); // Reiniciar los datos anteriores

    try {
      // Realiza la llamada al servicio de autenticación (como en el registro)
      const response: CommonResponse<LoginResponse> = 
        await AuthenticatorService.userLogin(user); // Similar a `userRegister`

      if (response.result.resultNumber === 0) {
        setData(response.data); // Guardar los datos de respuesta exitosos
      } else {
        setError(response.result.errorMessage || "Error desconocido.");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Error inesperado.");
      } else {
        setError("Error inesperado.");
      }
    } finally {
      setLoading(false);
    }
  };

  return { login, data, error, loading };
};
