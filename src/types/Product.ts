// types/Product.ts

export interface Product {
  id?: string; // Opcional al crear un nuevo producto
  name: string;
  description: string;
  reference: string;
  companyCode: string;
  tags: string;
  stock: number;
  price: number;
  purchasePrice: number;
  costValue: number;
  sellsValue: number;
  priceWithoutVAT: number;
  percentageVAT: number;
  contactId: string;
  creationDate?: string; // Opcional, proporcionado por el backend
  active?: boolean; // Opcional, proporcionado por el backend
  updatingDate?: string; // Opcional, proporcionado por el backend
}
