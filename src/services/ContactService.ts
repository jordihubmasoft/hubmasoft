// Import the CommonResponse type from your types folder
import { CommonResponse } from "../types/CommonResponse";

// Define the ContactService class
export default class ContactService {
  // Method to get a contact by its ID
  static async getContactById(contactId: string, token: string): Promise<CommonResponse<any>> {
    try {
      const baseURL = process.env.NEXT_PUBLIC_API?.replace(/\/+$/, '');
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
        console.log("API Data Received:", resultData); // Verifica aquí la estructura de los datos
        return {
          result: {
            resultNumber: resultData.result.resultNumber,
            errorMessage: resultData.result.errorMessage,
          },
          data: resultData.data, // Asegúrate de que resultData.data tiene la estructura esperada
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

  // src/services/ContactService.ts

static async updateContact(contactData: any, token: string): Promise<CommonResponse<any>> {
  try {
    const baseURL = process.env.NEXT_PUBLIC_API.replace(/\/+$/, '');
    if (!contactData.request || !contactData.request.contactId) {
      throw new Error("El campo 'request' y 'contactId' son obligatorios para la actualización.");
    }
    const url = `${baseURL}/Contact/${contactData.request.contactId}`; // Incluye contactId en la URL

    // Opcional: Elimina contactId del cuerpo si ya está en la URL
    const { contactId, ...bodyData } = contactData.request;

    console.log("Actualizando contacto con los siguientes datos:", bodyData);
    console.log("URL de la solicitud:", url);

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
      throw new Error(errorResponse.errors?.request?.[0] || `Error ${response.status}: ${response.statusText}`);
    }
  } catch (err: any) {
    console.error("Error en la solicitud:", err.message || err);
    throw new Error("Ocurrió un problema al actualizar el contacto.");
  }
}


  

}
