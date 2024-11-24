// Import the CommonResponse type from your types folder
import { CommonResponse } from "../types/CommonResponse";

// Define the ContactService class
export default class ContactService {
  // Method to get a contact by its ID
  static async getContactById(contactId: string, token: string): Promise<CommonResponse<any>> {
    try {
      console.log("ContactID ", contactId);
      const baseURL = process.env.NEXT_PUBLIC_API?.replace(/\/+$/, '');
      const url = `${baseURL}/Contact/${contactId}`;

      // Make the GET request to the API
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      // Check if the response is OK (status code 200-299)
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
        const errorText = await response.text();
        console.error(`Error ${response.status}: ${errorText}`);
        throw new Error(`Error ${response.status}: ${errorText}`);
      }
    } catch (err: any) {
      console.error("Error en la solicitud:", err.message || err);
      throw new Error("Ocurrió un problema al obtener el contacto.");
    }
  }

  // Method to get all contacts
  static async getAllContacts(token: string): Promise<CommonResponse<any[]>> {
    try {
      // Ensure there are no trailing slashes in the base URL
      const baseURL = process.env.NEXT_PUBLIC_API.replace(/\/+$/, '');
      const url = `${baseURL}/Contact/All`;

      // Make the GET request to the API
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      // Check if the response is OK
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
        // Handle non-OK responses
        const errorResponse = await response.json();
        throw new Error(errorResponse.result?.errorMessage || "Error al obtener los contactos");
      }
    } catch (err) {
      console.error("Error en la solicitud:", err);
      throw new Error("Ocurrió un problema al obtener los contactos.");
    }
  }

  // Method to create a new contact
  static async createContact(contactData: any, token: string, agentId: string): Promise<CommonResponse<any>> {
    try {
      // Verify that agentId is available
      if (!agentId) {
        throw new Error("El UserId no está disponible. El usuario no ha iniciado sesión correctamente.");
      }

      // Ensure there are no trailing slashes in the base URL
      const baseURL = process.env.NEXT_PUBLIC_API.replace(/\/+$/, '');
      const url = `${baseURL}/Contact`;

      // Make the POST request to the API
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...contactData,
          userId: agentId, // Add the agentId to the request body
        }),
      });

      // Check if the response is OK
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
        // Handle non-OK responses
        const errorResponse = await response.json();
        throw new Error(errorResponse.result?.errorMessage || "Error al crear el contacto");
      }
    } catch (err) {
      console.error("Error en la solicitud:", err);
      throw new Error("Ocurrió un problema al crear el contacto.");
    }
  }

  // Method to update a contact
  static async updateContact(contactData: any, token: string): Promise<CommonResponse<any>> {
    try {
      // Asegúrate de que no haya barras diagonales finales en la URL base
      const baseURL = process.env.NEXT_PUBLIC_API.replace(/\/+$/, '');
      const url = `${baseURL}/Contact`;

      console.log("Actualizando contacto con los siguientes datos:", contactData);
      console.log("URL de la solicitud:", url);

      // Añade contactId al cuerpo de la solicitud si no está incluido
      const bodyData = {
        ...contactData,
        contactId: contactData.contactId || "", // Asegúrate de incluir contactId
      };

      // Realiza la solicitud PUT a /Contact
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(bodyData),
      });

      console.log("Estado de la respuesta:", response.status);
      console.log("Encabezados de la respuesta:", response.headers);

      if (response.ok) {
        const resultData = await response.json();
        console.log("Datos recibidos del servidor:", resultData);
        return {
          result: {
            resultNumber: resultData.result.resultNumber,
            errorMessage: resultData.result.errorMessage,
          },
          data: resultData.data,
        };
      } else {
        // Intenta parsear la respuesta de error
        let errorResponse;
        try {
          errorResponse = await response.json();
        } catch (jsonError) {
          console.error("Error al parsear la respuesta de error:", jsonError);
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        console.error(`Error ${response.status}:`, errorResponse);
        throw new Error(errorResponse.result?.errorMessage || `Error ${response.status}: ${response.statusText}`);
      }
    } catch (err: any) {
      console.error("Error en la solicitud:", err.message || err);
      throw new Error("Ocurrió un problema al actualizar el contacto.");
    }
  }
}
