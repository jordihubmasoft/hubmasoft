// ProductService.ts

import { CommonResponse } from "../../../types/CommonResponse";
import { Product } from "../../../types/Product";
import { CreateProductResponse } from "../../../types/CreateProductResponse";

export default class ProductService {
  
  /**
   * Método para crear un nuevo producto.
   * @param product - Objeto que contiene los detalles del producto a crear.
   * @param token - Token de autorización para la solicitud.
   * @returns Una promesa que resuelve en una respuesta común con los datos del producto creado.
   */
  static async create(product: Product, token: string): Promise<CommonResponse<CreateProductResponse>> {
    try {
      const url = `${process.env.NEXT_PUBLIC_API}Product`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Añade el token en las cabeceras
        },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        const resultData = await response.json();
        return {
          result: {
            resultNumber: resultData.result.resultNumber,
            errorMessage: resultData.result.errorMessage,
          },
          data: resultData.data, // Asegúrate de que 'data' tenga la estructura de CreateProductResponse
        };
      } else {
        const errorResponse = await response.json();
        throw new Error(
          errorResponse.result?.errorMessage || "Error en la solicitud de creación del producto"
        );
      }
    } catch (err) {
      console.error("Error en la solicitud de creación de producto:", err);
      throw new Error("Ocurrió un problema al procesar la solicitud. Intenta nuevamente.");
    }
  }

  // Puedes agregar más métodos relacionados con productos aquí (e.g., get, update, delete)
}
