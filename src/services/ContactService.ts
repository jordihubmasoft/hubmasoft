// src/services/ContactService.ts

import { CommonResponse } from "../types/CommonResponse";
import { Contact } from "../types/Contact";
import { LinkedContact } from "../types/LinkedCobtsct"; // Asegúrate de importar la interfaz LinkedContact

export default class ContactService {
  // Método para obtener un contacto por su ID
  static async getContactById(contactId: string, token: string): Promise<CommonResponse<Contact[]>> {
    try {
      const baseURL = process.env.NEXT_PUBLIC_API?.replace(/\/+$/, '');
      if (!baseURL) {
        throw new Error("Base URL no está definido en las variables de entorno.");
      }
      const url = `${baseURL}/Contact/${contactId}`;

      console.log("URL:", url);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const resultData = await response.json();
        console.log("API Data Received:", resultData);
        return {
          result: {
            resultNumber: resultData.result.resultNumber,
            errorMessage: resultData.result.errorMessage,
          },
          data: resultData.data as Contact[], // Ahora es un arreglo de Contact
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

  // Método para obtener todos los contactos
  static async getAllContacts(token: string): Promise<CommonResponse<Contact[]>> {
    try {
      const baseURL = process.env.NEXT_PUBLIC_API?.replace(/\/+$/, '');
      if (!baseURL) {
        throw new Error("Base URL no está definido en las variables de entorno.");
      }
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

  // Método para crear un nuevo contacto
  static async createContact(contactData: Omit<Contact, 'id'>, token: string): Promise<CommonResponse<Contact>> {
    try {
      const baseURL = process.env.NEXT_PUBLIC_API?.replace(/\/+$/, '');
      if (!baseURL) {
        throw new Error("Base URL no está definido en las variables de entorno.");
      }
      const url = `${baseURL}/Contact`;

      const response = await fetch(url, {
        method: "POST",
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
        const errorResponse = await response.json();
        throw new Error(errorResponse.result?.errorMessage || "Error al crear el contacto");
      }
    } catch (err: any) {
      console.error("Error en la solicitud:", err.message || err);
      throw new Error("Ocurrió un problema al crear el contacto.");
    }
  }

  // Método para actualizar un contacto existente
  static async updateContact(contactData: Partial<Contact> & { contactId: string }, token: string): Promise<CommonResponse<Contact>> {
    try {
      const baseURL = process.env.NEXT_PUBLIC_API?.replace(/\/+$/, '');
      if (!baseURL) {
        throw new Error("Base URL no está definido en las variables de entorno.");
      }
      const url = `${baseURL}/Contact`; // Asegúrate de que el endpoint es correcto

      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(contactData), // Asegúrate de que contactData está correctamente estructurado
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
}