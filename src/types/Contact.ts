// src/types/Contact.ts

export interface ShippingAddress {
  direccion: string;
  poblacion: string;
  codigoPostal: string;
  provincia: string;
  pais: string;
}

export interface ExtraInformation {
  contact: string; // Ajusta el tipo según corresponda
  salesTax: number;
  equivalenceSurcharge: number;
  shoppingTax: number;
  paymentDay: number;
  vatType: string;
  internalReference: string;
  language: string;
  currency: string;
  paymentMethod: string;
  paymentExpirationDays: string;
  paymentExpirationDay: string;
  rate: string;
  discount: string;
  swift: string;
  iban: string;
  shippingAddress: ShippingAddress[];
  id: string;
  creationDate: string;
  active: boolean;
  updatingDate: string;
}

export interface Contact {
  id: string;
  userId: string;
  name: string;
  email: string;
  country: string;
  city: string;
  userType: string;
  phone: string;
  mobile: string;
  website: string;
  address: string;
  postalCode: string;
  nie: string;
  commercialName: string;
  province: string;
  skills?: string;
  experience?: string;
  companyName?: string;
  companySize?: string;
  extraInformation?: ExtraInformation; // Añadido
}
