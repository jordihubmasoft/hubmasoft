// src/types/family.ts
import { SubFamily } from './subFamily';

export interface Family {
  id: string;
  name: string;
  showInCatalog?: boolean;
  showInOrders?: boolean;
  subFamilies?: SubFamily[];
}
