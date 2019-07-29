import { Project } from './project';
import { ProjectFile } from './project-file';
import { ApplicationInventory } from './application-inventory';

export interface Inventory {
  ID?: number;
  Name: string;
  Project: Project;
  SourceFile: ProjectFile;
  ApplicationInventories: ApplicationInventory[];
}
