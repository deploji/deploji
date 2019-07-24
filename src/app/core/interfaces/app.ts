import { Project } from './project';
import { Repository } from './repository';
import { ApplicationInventory } from './application-inventory';

export interface App {
  ID?: number;
  Name: string;
  Project: Project;
  AnsiblePlaybook: string;
  Repository: Repository;
  RepositoryArtifact: string;
  Inventories: ApplicationInventory[];
}
