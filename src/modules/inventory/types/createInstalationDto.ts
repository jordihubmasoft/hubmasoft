export interface CreateInstalationDto {
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
    };
  }
  