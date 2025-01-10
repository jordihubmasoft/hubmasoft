// src/services/FamilyService.ts

import { Family, CreateFamilyPayload, UpdateFamilyPayload } from "../types/family";

export default class FamilyService {
  private static baseURL: string = process.env.NEXT_PUBLIC_API?.replace(/\/+$/, '') || '';

  // Obtener todas las familias
  static async getAllFamilies(token: string): Promise<Family[]> {
    try {
      const url = `${this.baseURL}/Family`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const familias: Family[] = await response.json();
        return familias;
      } else {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Error al obtener las familias");
      }
    } catch (err: any) {
      console.error("Error en la solicitud:", err.message || err);
      throw new Error("Ocurrió un problema al obtener las familias.");
    }
  }

  // Crear una nueva familia
  static async createFamily(payload: CreateFamilyPayload, token: string): Promise<Family> {
    try {
      const url = `${this.baseURL}/Family`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const nuevaFamilia: Family = await response.json();
        return nuevaFamilia;
      } else {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Error al crear la familia");
      }
    } catch (err: any) {
      console.error("Error en la solicitud:", err.message || err);
      throw new Error("Ocurrió un problema al crear la familia.");
    }
  }


  // Obtener una familia por su ID
  static async getFamilyById(id: string, token: string): Promise<Family> {
    try {
      const url = `${this.baseURL}/Family/${id}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const familia: Family = await response.json();
        return familia;
      } else {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Error al obtener la familia");
      }
    } catch (err: any) {
      console.error("Error en la solicitud:", err.message || err);
      throw new Error("Ocurrió un problema al obtener la familia.");
    }
  }

  // Crear una nueva familia
  

  // Actualizar una familia existente
  static async updateFamily(payload: UpdateFamilyPayload, token: string): Promise<Family> {
    try {
      const url = `${this.baseURL}/Family`;

      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const familiaActualizada: Family = await response.json();
        return familiaActualizada;
      } else {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Error al actualizar la familia");
      }
    } catch (err: any) {
      console.error("Error en la solicitud:", err.message || err);
      throw new Error("Ocurrió un problema al actualizar la familia.");
    }
  }
}
