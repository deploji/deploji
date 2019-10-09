import { Project } from './project';
import { ApplicationInventory } from './application-inventory';
import { Permissions } from './permissions';

export interface Inventory {
  Permissions?: Permissions;
  Write?: boolean;
  ID?: number;
  Name: string;
  Project?: Project;
  SourceFile?: string;
  ApplicationInventories?: ApplicationInventory[];
}
