import { UserLogin, LoginResponse } from "../../../types/UserLogin";
import { CommonResponse } from "../../../types/CommonResponse";
import { UserRegister } from "../../../types/UserRegister";

export default class AuthenticatorService {

  // Método para validar el token (PIN)
  static async validateToken(pin: string): Promise<boolean> {
    try {
      const url = `${process.env.NEXT_PUBLIC_API}/isValidToken?token=${pin}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        return data === true; // Si es verdadero, significa que el token es válido
      } else {
        throw new Error("Error en la validación del token");
      }
    } catch (err) {
      console.error("Error en la solicitud de validación del token:", err);
      throw new Error("Error al validar el token");
    }
  }


  // Método para iniciar sesión
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
          email: user.email,
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
      throw new Error("Ocurrió un problema al procesar la solicitud. Intenta nuevamente.");
    }
  }

  // Método para recuperar contraseña
  static async resetPassword(token: string, newPassword: string): Promise<CommonResponse<null>> {
    try {
      const url = `${process.env.NEXT_PUBLIC_API}user/UpdatePass`; // Verifica que el endpoint sea el correcto

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
          password: newPassword,
        }),
      });

      if (response.ok) {
        const resultData = await response.json();
        return {
          result: {
            resultNumber: resultData.result.resultNumber,
            errorMessage: resultData.result.errorMessage,
          },
          data: null, // No necesitas devolver datos aquí
        };
      } else {
        const errorResponse = await response.json();
        throw new Error(errorResponse.result?.errorMessage || "Error al resetear la contraseña");
      }
    } catch (err) {
      console.error("Error en la solicitud:", err);
      throw new Error("Ocurrió un problema al procesar la solicitud. Intenta nuevamente.");
    }
  }

  // Método para registro de usuario
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

  // Método para actualizar datos de usuario
  static async updateUser(userId: string, userData: any, token: string): Promise<any> {
    if (!userId || !token) {
      throw new Error("User ID y token de autorización son necesarios.");
    }

    const apiUrl = process.env.NEXT_PUBLIC_API || 'https://hubmasoftapi-url.azurewebsites.net/';
    const url = `${apiUrl}Contacts/${userId}/Update`;  // Verifica que el endpoint sea el correcto

    try {
      const response = await fetch(url, {
        method: 'PUT',  // Cambia a PUT porque estás actualizando
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`  // Envía el token en la cabecera de autorización
        },
        body: JSON.stringify(userData)  // Envía los datos del formulario en el cuerpo de la solicitud
      });

      if (!response.ok) {
        const errorText = await response.text(); // Obtener texto si no es JSON
        throw new Error(`Error ${response.status}: ${errorText || response.statusText}`);
      }

      const responseText = await response.text();
      return responseText ? JSON.parse(responseText) : {};  // Devuelve el JSON parseado

    } catch (error) {
      // Manejar errores de red y otros
      console.error('Error en updateUser:', error);
      throw error;
    }
  }
  static async sendResetPasswordEmail(email: string): Promise<CommonResponse<null>> {
    try {
      // Pasa el email como parámetro en la URL
      const url = `${process.env.NEXT_PUBLIC_API}/Authentication?email=${email}`; 
  
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        const resultData = await response.json();
        return {
          result: {
            resultNumber: resultData.result.resultNumber,
            errorMessage: resultData.result.errorMessage,
          },
          data: null,
        };
      } else {
        const errorResponse = await response.json();
        throw new Error(errorResponse.result?.errorMessage || "Error al enviar el correo de recuperación");
      }
    } catch (err) {
      console.error("Error en la solicitud:", err);
      throw new Error("Ocurrió un problema al procesar la solicitud. Intenta nuevamente.");
    }
  }
}  

