import { Inventory } from './inventory';
import { JobStatus } from '../enums/job-status.enum';
import { Project } from './project';
import { JobTypesEnum } from '../enums/job-types.enum';
import { Template } from './template';
import { SshKey } from './ssh-key';

export interface Job {
  Type?: JobTypesEnum;
  TemplateID?: number;
  Template?: Template;
  SshKeyID?: number;
  SshKey?: SshKey;
  InventoryID?: number;
  ProjectID?: number;
  ID?: number;
  Project?: Project;
  Inventory?: Inventory;
  Version?: string;
  Playbook?: string;
  CreatedAt?: any;
  StartedAt?: any;
  FinishedAt?: any;
  Status?: JobStatus;
  ExtraVariables?: string;
}
