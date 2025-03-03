// types/Product.ts

export interface Product {
  id?: string; // Opcional, se asigna cuando el producto existe en la base de datos
  referencia: string;
  nombre: string;
  descripcion: string;
  familia: string;
  subFamilia: string;
  unidadMedida: string;
  precio: string;
  iva: string;
  descuento: string;
  codigoBarras: string;
  codigoFabricacion: string;
  peso: string;
  nombreTarifa: string;
  subtotal: string;
  impuestos: string;
  total: string;
  tarifas: string;
  precioRecomendado: string;
  proveedor: string;
  costeMedio: string;
  precioCompraSubtotal: string;
  precioCompraImpuestos: string;
  precioCompraTotal: string;
  almacenPredeterminado: string;
  cantidad: number;
  contactId: string;
  installationId: string[];
}
