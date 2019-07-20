import {Project} from './project';
import {ProjectFile} from './project-file';

export interface Inventory {
  ID?: number;
  Name: string;
  Project: Project;
  SourceFile: ProjectFile;
}
