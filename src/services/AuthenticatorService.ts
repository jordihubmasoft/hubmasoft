import { UserLogin, LoginResponse } from "../types/UserLogin";
import { CommonResponse } from "../types/CommonResponse";
import { UserRegister } from "types/UserRegister";

export default class AuthenticatorService {
  static async userLogin(
    user: UserLogin
  ): Promise<CommonResponse<LoginResponse>> {
    try {
      const url = `${process.env.NEXT_PUBLIC_API}user/login`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email, // Cambia a 'username' si el backend lo espera
          password: user.password,
        }),
      });

      if (response.ok) {
        const resultData = await response.json();
        return {
          result: {
            resultNumber: resultData.result.resultNumber,
            errorMessage: resultData.result.errorMessage,
          },
          data: resultData.data,
        };
      } else {
        const errorResponse = await response.json();
        throw new Error(
          errorResponse.result?.errorMessage || "Error en la solicitud de inicio de sesión"
        );
      }
    } catch (err) {
      console.error("Error en la solicitud:", err);
      throw new Error(
        "Ocurrió un problema al procesar la solicitud. Intenta nuevamente."
      );
    }
  }

  static async userRegister(
    user: UserRegister
  ): Promise<CommonResponse<LoginResponse>> {
    try {
      const url = `${process.env.NEXT_PUBLIC_API}user/register`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const resultData = await response.json();
        return {
          result: {
            resultNumber: resultData.result.resultNumber,
            errorMessage: resultData.result.errorMessage,
          },
          data: resultData.data,
        };
      } else {
        const errorResponse = await response.json();
        throw new Error(
          errorResponse.result?.errorMessage || "Error en la solicitud de registro"
        );
      }
    } catch (err) {
      console.error("Error en la solicitud:", err);
      throw new Error("Ocurrió un problema al procesar el registro. Intenta nuevamente.");
    }
  }
}
