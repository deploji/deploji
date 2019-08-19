import { Inventory } from './inventory';
import { JobStatus } from '../enums/job-status.enum';
import { Project } from './project';
import { JobTypesEnum } from '../enums/job-types.enum';

export interface Job {
  Type?: JobTypesEnum;
  InventoryID?: number;
  ProjectID?: number;
  ID?: number;
  Project?: Project;
  Inventory?: Inventory;
  Version?: string;
  CreatedAt?: any;
  StartedAt?: any;
  FinishedAt?: any;
  Status?: JobStatus;
}
