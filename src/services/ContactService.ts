// src/services/ContactService.ts
import { CommonResponse } from "../types/CommonResponse";
import { Contact } from "../types/Contact";

export default class ContactService {
  static async getContactById(contactId: string, token: string): Promise<CommonResponse<Contact[]>> {
    try {
      const baseURL = process.env.NEXT_PUBLIC_API?.replace(/\/+$/, '');
      if (!baseURL) throw new Error("Base URL no está definido en las variables de entorno.");
      const url = `${baseURL}/Contact/${contactId}`;

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
          data: resultData.data as Contact[],
        };
      } else {
        const errorText = await response.text();
        console.error(`Error ${response.status}: ${errorText}`);
        throw new Error(`Error ${response.status}: ${errorText}`);
      }
    } catch (err: any) {
      console.error("Error en la solicitud:", err.message || err);
      throw new Error("Ocurrió un problema al obtener el contacto.");
    }
  }

  static async getAllContacts(token: string): Promise<CommonResponse<Contact[]>> {
    try {
      const baseURL = process.env.NEXT_PUBLIC_API?.replace(/\/+$/, '');
      if (!baseURL) throw new Error("Base URL no está definido en las variables de entorno.");
      const url = `${baseURL}/Contact/All`;

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
          data: resultData.data as Contact[],
        };
      } else {
        const errorResponse = await response.json();
        throw new Error(errorResponse.result?.errorMessage || "Error al obtener los contactos");
      }
    } catch (err: any) {
      console.error("Error en la solicitud:", err.message || err);
      throw new Error("Ocurrió un problema al obtener los contactos.");
    }
  }

  // Modificado: se envía el payload directamente para crear un contacto
  static async createContact(contactData: Omit<Contact, "id" | "userId">, token: string): Promise<CommonResponse<Contact>> {
    try {
      const baseURL = process.env.NEXT_PUBLIC_API?.replace(/\/+$/, '');
      if (!baseURL) throw new Error("Base URL no está definido en las variables de entorno.");
      const url = `${baseURL}/Contact`;

      const payload = { ...contactData };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const resultData = await response.json();
        return {
          result: {
            resultNumber: resultData.result.resultNumber,
            errorMessage: resultData.result.errorMessage,
          },
          data: resultData.data as Contact,
        };
      } else {
        const errorResponse = await response.json();
        throw new Error(errorResponse.result?.errorMessage || "Error al crear el contacto");
      }
    } catch (err: any) {
      console.error("Error en la solicitud:", err.message || err);
      throw new Error("Ocurrió un problema al crear el contacto.");
    }
  }

  static async updateContact(contactData: Partial<Contact> & { contactId: string }, token: string): Promise<CommonResponse<Contact>> {
    try {
      const baseURL = process.env.NEXT_PUBLIC_API?.replace(/\/+$/, '');
      if (!baseURL) throw new Error("Base URL no está definido en las variables de entorno.");
      const url = `${baseURL}/Contact`;

      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(contactData),
      });

      if (response.ok) {
        const resultData = await response.json();
        return {
          result: {
            resultNumber: resultData.result.resultNumber,
            errorMessage: resultData.result.errorMessage,
          },
          data: resultData.data as Contact,
        };
      } else {
        let errorResponse;
        try {
          errorResponse = await response.json();
        } catch (jsonError) {
          console.error("Error al parsear la respuesta de error:", jsonError);
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        throw new Error(errorResponse.result?.errorMessage || `Error ${response.status}: ${response.statusText}`);
      }
    } catch (err: any) {
      console.error("Error en la solicitud:", err.message || err);
      throw new Error("Ocurrió un problema al actualizar el contacto.");
    }
  }

  static async deleteContact(contactId: string, token: string): Promise<CommonResponse<null>> {
    try {
      const baseURL = process.env.NEXT_PUBLIC_API?.replace(/\/+$/, '');
      if (!baseURL) throw new Error("Base URL no está definido en las variables de entorno.");
      const url = `${baseURL}/Contact/${contactId}`;
      
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
        let errorMessage = `Error al eliminar el contacto. Código de estado: ${response.status}`;
        try {
          const errorResponse = await response.json();
          errorMessage = errorResponse.result?.errorMessage || errorMessage;
        } catch {
          const errorText = await response.text();
          errorMessage = `Error al eliminar el contacto: ${errorText}`;
        }
        throw new Error(errorMessage);
      }
    } catch (err: any) {
      console.error("Error en deleteContact:", err.message || err);
      throw new Error("Ocurrió un problema al eliminar el contacto.");
    }
  }

  // NUEVO: Función para obtener sugerencias usando el endpoint WithFiltersV2
  // NUEVO: Función para obtener sugerencias usando el endpoint WithFiltersV2
static async getContactsWithFiltersV2(filterPayload: any, token: string): Promise<CommonResponse<Contact[]>> {
  try {
    const baseURL = process.env.NEXT_PUBLIC_API?.replace(/\/+$/, '');
    if (!baseURL) throw new Error("Base URL no está definido en las variables de entorno.");
    const url = `${baseURL}/Contact/WithFiltersV2`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(filterPayload),
    });

    if (response.ok) {
      const resultData = await response.json();

      // Si la respuesta es un array, se asume que es directamente la lista de contactos
      if (Array.isArray(resultData)) {
        return {
          result: {
            resultNumber: resultData.length,
            errorMessage: "",
          },
          data: resultData as Contact[],
        };
      }
      
      // Si la respuesta tiene la estructura { result, data }
      if (resultData.data) {
        return {
          result: {
            resultNumber: resultData.result?.resultNumber,
            errorMessage: resultData.result?.errorMessage,
          },
          data: resultData.data as Contact[],
        };
      }

      throw new Error("Formato de respuesta inesperado.");
    } else {
      const errorResponse = await response.json();
      throw new Error(errorResponse.result?.errorMessage || "Error al obtener contactos con filtros");
    }
  } catch (err: any) {
    console.error("Error en la solicitud de getContactsWithFiltersV2:", err.message || err);
    throw new Error("Ocurrió un problema al obtener contactos con filtros.");
  }
}

}
