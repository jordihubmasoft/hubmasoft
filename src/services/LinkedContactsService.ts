// src/services/LinkedContactsService.ts
import { CommonResponse } from "../types/CommonResponse";
import { LinkedContact } from "../types/LinkedContact";

export default class LinkedContactsService {
  static async getByContactId(contactId: string, token: string): Promise<CommonResponse<LinkedContact[]>> {
    try {
      const baseURL = process.env.NEXT_PUBLIC_API?.replace(/\/+$/, '');
      if (!baseURL) throw new Error("Base URL no está definido en las variables de entorno.");
      const url = `${baseURL}/LinkedContact/${contactId}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const resultData = await response.json();
        return {
          result: {
            resultNumber: resultData.result.resultNumber,
            errorMessage: resultData.result.errorMessage,
          },
          data: resultData.data as LinkedContact[],
        };
      } else {
        let errorMessage = `Error al obtener el contacto vinculado. Código de estado: ${response.status}`;
        const clonedResponse = response.clone();
        try {
          const errorResponse = await response.json();
          errorMessage = errorResponse.result?.errorMessage || errorMessage;
        } catch {
          const errorText = await clonedResponse.text();
          errorMessage = `Error al obtener el contacto vinculado: ${errorText}`;
        }
        console.error("Respuesta del servidor:", errorMessage);
        throw new Error(errorMessage);
      }
    } catch (err: any) {
      console.error("Error en la solicitud:", err.message || err);
      throw new Error("Ocurrió un problema al obtener el contacto vinculado.");
    }


  }

  static async getPending(contactId: string, token: string): Promise<CommonResponse<LinkedContact[]>> {
    try {
      const baseURL = process.env.NEXT_PUBLIC_API?.replace(/\/+$/, '');
      if (!baseURL) throw new Error("Base URL no está definido en las variables de entorno.");
      const url = `${baseURL}/LinkedContact/pending/${contactId}`;
  
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        const resultData = await response.json();
        return {
          result: {
            resultNumber: resultData.result.resultNumber,
            errorMessage: resultData.result.errorMessage,
          },
          data: resultData.data as LinkedContact[],
        };
      } else {
        let errorMessage = `Error al obtener solicitudes pendientes. Código de estado: ${response.status}`;
        const clonedResponse = response.clone();
        try {
          const errorResponse = await response.json();
          errorMessage = errorResponse.result?.errorMessage || errorMessage;
        } catch {
          const errorText = await clonedResponse.text();
          errorMessage = `Error al obtener solicitudes pendientes: ${errorText}`;
        }
        console.error("Respuesta del servidor:", errorMessage);
        throw new Error(errorMessage);
      }
    } catch (err: any) {
      console.error("Error en la solicitud:", err.message || err);
      throw new Error("Ocurrió un problema al obtener las solicitudes pendientes.");
    }
  }

  static async addLinkedContact(ownerContactId: string, linkedContactId: string, token: string): Promise<CommonResponse<LinkedContact>> {
    try {
      const baseURL = process.env.NEXT_PUBLIC_API?.replace(/\/+$/, '');
      if (!baseURL) throw new Error("Base URL no está definido en las variables de entorno.");
      const url = `${baseURL}/LinkedContact`;

      // Se mantiene el nombre "LinekdContactId" ya que es lo que espera el backend.
      // Cambiado a isApproved: false para que la vinculación quede pendiente de aprobación.
      const body = { 
        OwnerContactId: ownerContactId, 
        LinekdContactId: linkedContactId,
        isApproved: false
      };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        // Clonamos la respuesta inmediatamente para usarla en caso de fallo en el parseo
        const clonedResponse = response.clone();
        try {
          const resultData = await response.json();
          return {
            result: {
              resultNumber: resultData.result.resultNumber,
              errorMessage: resultData.result.errorMessage,
            },
            data: resultData.data as LinkedContact,
          };
        } catch {
          const textData = await clonedResponse.text();
          console.warn("Respuesta no JSON recibida:", textData);
          return {
            result: {
              resultNumber: 0,
              errorMessage: ""
            },
            data: {
              ownerContactId,
              linkedContactId
            } as LinkedContact,
          };
        }
      } else {
        let errorMessage = `Error al agregar el contacto vinculado. Código de estado: ${response.status}`;
        const clonedResponse = response.clone();
        try {
          const errorResponse = await response.json();
          errorMessage = errorResponse.result?.errorMessage || errorMessage;
        } catch {
          const errorText = await clonedResponse.text();
          errorMessage = `Error al agregar el contacto vinculado: ${errorText}`;
        }
        console.error("Respuesta del servidor:", errorMessage);
        throw new Error(errorMessage);
      }
    } catch (err: any) {
      console.error("Error en la solicitud:", err.message || err);
      throw new Error("Ocurrió un problema al agregar el contacto vinculado.");
    }
  }

  static async approveLinkedContact(
    ownerContactId: string,
    contactId: string,
    token: string
  ): Promise<CommonResponse<LinkedContact>> {
    try {
      const baseURL = process.env.NEXT_PUBLIC_API?.replace(/\/+$/, '');
      if (!baseURL) throw new Error("Base URL no está definido en las variables de entorno.");
      const url = `${baseURL}/LinkedContact/approve?ownerContactId=${ownerContactId}&contactId=${contactId}`;
  
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        // LEEMOS UNA SOLA VEZ COMO TEXTO
        const rawText = await response.text();
  
        try {
          // Intentamos parsear a JSON
          const resultData = JSON.parse(rawText);
  
          return {
            result: {
              resultNumber: resultData.result?.resultNumber ?? 0,
              errorMessage: resultData.result?.errorMessage ?? "",
            },
            data: resultData.data as LinkedContact,
          };
  
        } catch (err) {
          // Si falla el parse, es que la respuesta no es JSON
          console.warn("Respuesta no JSON recibida en approveLinkedContact:", rawText);
  
          // Retornamos un objeto mínimo para que el frontend no falle
          return {
            result: {
              resultNumber: 0,
              errorMessage: "",
            },
            data: {
              ownerContactId,
              linkedContactId: contactId,
              isApproved: true,
            } as LinkedContact,
          };
        }
  
      } else {
        // Manejo de error si el status no es 2xx
        let errorMessage = `Error al aprobar el contacto vinculado. Código de estado: ${response.status}`;
  
        try {
          // Podrías leer también el body como texto
          const errorText = await response.text();
          errorMessage = `Error al aprobar el contacto vinculado: ${errorText}`;
        } catch (err) {
          // Si falla la lectura, nos quedamos con el mensaje por defecto
          console.error("No se pudo leer el cuerpo de la respuesta de error.");
        }
  
        console.error("Respuesta del servidor:", errorMessage);
        throw new Error(errorMessage);
      }
    } catch (err: any) {
      console.error("Error en la solicitud:", err.message || err);
      throw new Error("Ocurrió un problema al aprobar el contacto vinculado.");
    }
  }
  
  

  static async deleteLinkedContact(ownerContactId: string, linkedContactId: string, token: string): Promise<CommonResponse<null>> {
    try {
      const baseURL = process.env.NEXT_PUBLIC_API?.replace(/\/+$/, '');
      if (!baseURL) throw new Error("Base URL no está definido en las variables de entorno.");
      const url = `${baseURL}/LinkedContact?ownerContactId=${ownerContactId}&contactId=${linkedContactId}`;

      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // Clonamos la respuesta de inmediato para usarla en caso de error al parsear
        const clonedResponse = response.clone();
        try {
          const resultData = await response.json();
          return {
            result: {
              resultNumber: resultData.result.resultNumber,
              errorMessage: resultData.result.errorMessage,
            },
            data: null,
          };
        } catch {
          const textData = await clonedResponse.text();
          console.warn("Respuesta no JSON recibida en deleteLinkedContact:", textData);
          return {
            result: {
              resultNumber: 0,
              errorMessage: ""
            },
            data: null,
          };
        }
      } else {
        let errorMessage = `Error al eliminar el contacto vinculado. Código de estado: ${response.status}`;
        const clonedResponse = response.clone();
        try {
          const errorResponse = await response.json();
          errorMessage = errorResponse.result?.errorMessage || errorMessage;
        } catch {
          const errorText = await clonedResponse.text();
          errorMessage = `Error al eliminar el contacto vinculado: ${errorText}`;
        }
        console.error("Respuesta del servidor:", errorMessage);
        throw new Error(errorMessage);
      }
    } catch (err: any) {
      console.error("Error en la solicitud:", err.message || err);
      throw new Error("Ocurrió un problema al eliminar el contacto vinculado.");
    }
  }
}
