import { Project } from './project';
import { Repository } from './repository';
import { ApplicationInventory } from './application-inventory';
import { Permissions } from './permissions';

export interface App {
  Permissions?: Permissions;
  ID?: number;
  Name?: string;
  Project?: Project;
  AnsiblePlaybook?: string;
  Repository?: Repository;
  RepositoryArtifact?: string;
  RepositoryGroup?: string;
  Inventories?: ApplicationInventory[];
}
