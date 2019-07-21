import { Project } from './project';
import { Repository } from './repository';

export interface App {
  ID?: number;
  Name: string;
  Project: Project;
  AnsiblePlaybook: string;
  Repository: Repository;
  RepositoryArtifact: string;
}
