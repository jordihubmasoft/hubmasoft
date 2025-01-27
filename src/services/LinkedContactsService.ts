// src/services/LinkedContactsService.ts

import { CommonResponse } from "../types/CommonResponse";
import { LinkedContact } from "../types/LinkedContact";

export default class LinkedContactsService {
  // Método para obtener un contacto vinculado por su ContactId
  static async getByContactId(contactId: string, token: string): Promise<CommonResponse<LinkedContact[]>> {
    try {
      const baseURL = process.env.NEXT_PUBLIC_API?.replace(/\/+$/, '');
      if (!baseURL) {
        throw new Error("Base URL no está definido en las variables de entorno.");
      }
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
        try {
          const errorResponse = await response.json();
          errorMessage = errorResponse.result?.errorMessage || errorMessage;
        } catch {
          // La respuesta no es JSON
          const errorText = await response.text();
          errorMessage = `Error al obtener el contacto vinculado: ${errorText}`;
        }
        console.error('Respuesta del servidor:', errorMessage);
        throw new Error(errorMessage);
      }
    } catch (err: any) {
      console.error("Error en la solicitud:", err.message || err);
      throw new Error("Ocurrió un problema al obtener el contacto vinculado.");
    }
  }

  // Método para agregar un contacto vinculado
  static async addLinkedContact(
    ownerContactId: string,
    linkedContactId: string,
    token: string
  ): Promise<CommonResponse<LinkedContact>> {
    try {
      const baseURL = process.env.NEXT_PUBLIC_API?.replace(/\/+$/, '');
      if (!baseURL) {
        throw new Error("Base URL no está definido en las variables de entorno.");
      }
      const url = `${baseURL}/LinkedContact`;

      const body = {
        ownerContactId,
        LinkedContactId: linkedContactId, // Clave corregida
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
        const resultData = await response.json();
        return {
          result: {
            resultNumber: resultData.result.resultNumber,
            errorMessage: resultData.result.errorMessage,
          },
          data: resultData.data as LinkedContact,
        };
      } else {
        let errorMessage = `Error al agregar el contacto vinculado. Código de estado: ${response.status}`;
        try {
          const errorResponse = await response.json();
          errorMessage = errorResponse.result?.errorMessage || errorMessage;
        } catch {
          // La respuesta no es JSON
          const errorText = await response.text();
          errorMessage = `Error al agregar el contacto vinculado: ${errorText}`;
        }
        console.error('Respuesta del servidor:', errorMessage);
        throw new Error(errorMessage);
      }
    } catch (err: any) {
      console.error("Error en la solicitud:", err.message || err);
      throw new Error("Ocurrió un problema al agregar el contacto vinculado.");
    }
  }

  // Método para aprobar un contacto vinculado
  static async approveLinkedContact(ownerContactId: string, contactId: string, token: string): Promise<CommonResponse<LinkedContact>> {
    try {
      const baseURL = process.env.NEXT_PUBLIC_API?.replace(/\/+$/, '');
      if (!baseURL) {
        throw new Error("Base URL no está definido en las variables de entorno.");
      }
      const url = `${baseURL}/LinkedContact/approve?ownerContactId=${ownerContactId}&contactId=${contactId}`;

      const response = await fetch(url, {
        method: "PUT",
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
          data: resultData.data as LinkedContact,
        };
      } else {
        let errorMessage = `Error al aprobar el contacto vinculado. Código de estado: ${response.status}`;
        try {
          const errorResponse = await response.json();
          errorMessage = errorResponse.result?.errorMessage || errorMessage;
        } catch {
          // La respuesta no es JSON
          const errorText = await response.text();
          errorMessage = `Error al aprobar el contacto vinculado: ${errorText}`;
        }
        console.error('Respuesta del servidor:', errorMessage);
        throw new Error(errorMessage);
      }
    } catch (err: any) {
      console.error("Error en la solicitud:", err.message || err);
      throw new Error("Ocurrió un problema al aprobar el contacto vinculado.");
    }
  }

  // Método para eliminar un contacto vinculado
  static async deleteLinkedContact(ownerContactId: string, contactId: string, token: string): Promise<CommonResponse<null>> {
    try {
      const baseURL = process.env.NEXT_PUBLIC_API?.replace(/\/+$/, '');
      if (!baseURL) {
        throw new Error("Base URL no está definido en las variables de entorno.");
      }
      const url = `${baseURL}/LinkedContact?ownerContactId=${ownerContactId}&contactId=${contactId}`;

      const response = await fetch(url, {
        method: "DELETE",
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
          data: null,
        };
      } else {
        let errorMessage = `Error al eliminar el contacto vinculado. Código de estado: ${response.status}`;
        try {
          const errorResponse = await response.json();
          errorMessage = errorResponse.result?.errorMessage || errorMessage;
        } catch {
          // La respuesta no es JSON
          const errorText = await response.text();
          errorMessage = `Error al eliminar el contacto vinculado: ${errorText}`;
        }
        console.error('Respuesta del servidor:', errorMessage);
        throw new Error(errorMessage);
      }
    } catch (err: any) {
      console.error("Error en la solicitud:", err.message || err);
      throw new Error("Ocurrió un problema al eliminar el contacto vinculado.");
    }
  }
}
