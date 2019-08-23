import { Project } from './project';
import { ApplicationInventory } from './application-inventory';

export interface Inventory {
  ID?: number;
  Name: string;
  Project?: Project;
  SourceFile?: string;
  ApplicationInventories?: ApplicationInventory[];
}
