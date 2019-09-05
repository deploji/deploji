import { Inventory } from './inventory';
import { JobStatus } from '../enums/job-status.enum';
import { Project } from './project';
import { JobTypesEnum } from '../enums/job-types.enum';
import { Template } from './template';
import { SshKey } from './ssh-key';
import { App } from './app';
import { User } from './user';

export interface Job {
  Type?: JobTypesEnum;
  TemplateID?: number;
  Template?: Template;
  KeyID?: number;
  Key?: SshKey;
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
  Application?: App;
  ApplicationID?: number;
  User?: User;
  UserID?: number;
  ExtraVariables?: string;
}
