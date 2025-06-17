export interface Instalation {
    id: string;
    name: string;
    email: string;
    phone: string;
    phone1: string;
    address: {
      direction: string;
      city: string;
      postalCode: string;
      province: string;
      country: string;
      id: string;
      creationDate: string;
      active: boolean;
      updatingDate: string;
    };
    productInstallations: any[];
    creationDate: string;
    active: boolean;
    updatingDate: string;
    nombreGerente?: string;
    telefonoGerente?: string;
    emailGerente?: string;
  }
  