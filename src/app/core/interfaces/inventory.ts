import { Project } from './project';
import { ApplicationInventory } from './application-inventory';

export interface Inventory {
  Admin?: boolean;
  Write?: boolean;
  ID?: number;
  Name: string;
  Project?: Project;
  SourceFile?: string;
  ApplicationInventories?: ApplicationInventory[];
}
