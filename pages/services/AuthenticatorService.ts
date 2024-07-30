import { CommonResponse } from "../types/CommonResponse";
import { LoginResponse, UserLogin } from "../types/UserLogin";

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
          username: user.userName,
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
        throw new Error("Error en la solicitud de inicio de sesión");
      }
    } catch (err) {
      throw err;
    }
  }
}
