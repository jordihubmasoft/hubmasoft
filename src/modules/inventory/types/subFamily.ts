// src/types/SubFamily.ts

export interface SubFamily {
    id: string;
    familyId: string;
    name: string;
  }
  
  export interface CreateSubFamilyPayload {
    familyId: string;
    name: string;
  }
  
  export interface UpdateSubFamilyPayload {
    name: string;
    subFamilyId: string;
  }
  