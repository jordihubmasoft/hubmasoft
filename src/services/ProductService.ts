import { Product } from "../types/Product";

export default class ProductService {
  // Método para obtener todos los productos
  static async getAllProducts(token: string): Promise<Product[]> {
    try {
      const baseURL = process.env.NEXT_PUBLIC_API?.replace(/\/+$/, '');
      const url = `${baseURL}/Product`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const products = await response.json();
        return products; // Asumiendo que la respuesta es un array de productos
      } else {
        const errorText = await response.text();
        console.error(`Error ${response.status}: ${errorText}`);
        throw new Error(`Error ${response.status}: ${errorText}`);
      }
    } catch (err: any) {
      console.error("Error en la solicitud:", err.message || err);
      throw new Error("Ocurrió un problema al obtener los productos.");
    }
  }

  // Método para crear un nuevo producto
  static async createProduct(productData: Product, token: string): Promise<Product> {
    try {
      const baseURL = process.env.NEXT_PUBLIC_API?.replace(/\/+$/, '');
      const url = `${baseURL}/Product`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        const newProduct = await response.json();
        return newProduct; // La respuesta completa del producto creado
      } else {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Error al crear el producto");
      }
    } catch (err: any) {
      console.error("Error en la solicitud:", err);
      throw new Error("Ocurrió un problema al crear el producto.");
    }
  }

  // Método para eliminar un producto por ID
  static async deleteProduct(productId: string, token: string): Promise<void> {
    try {
      const baseURL = process.env.NEXT_PUBLIC_API?.replace(/\/+$/, '');
      const url = `${baseURL}/Product/${productId}`;

      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Error ${response.status}: ${errorText}`);
        throw new Error(`Error ${response.status}: ${errorText}`);
      }
    } catch (err: any) {
      console.error("Error en la solicitud:", err.message || err);
      throw new Error("Ocurrió un problema al eliminar el producto.");
    }
  }

  // Método para actualizar un producto por ID
  static async updateProduct(productId: string, productData: Product, token: string): Promise<Product> {
    try {
      const baseURL = process.env.NEXT_PUBLIC_API?.replace(/\/+$/, '');
      const url = `${baseURL}/Product/${productId}`;

      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        const updatedProduct = await response.json();
        return updatedProduct; // La respuesta completa del producto actualizado
      } else {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Error al actualizar el producto");
      }
    } catch (err: any) {
      console.error("Error en la solicitud:", err);
      throw new Error("Ocurrió un problema al actualizar el producto.");
    }
  }
}
