import { App } from './app';
import { Inventory } from './inventory';
import { JobStatus } from '../enums/job-status.enum';

export interface Deployment {
  InventoryID?: number;
  ApplicationID?: number;
  ID?: number;
  Application?: App;
  Inventory?: Inventory;
  Version?: string;
  CreatedAt?: any;
  StartedAt?: any;
  FinishedAt?: any;
  Status?: JobStatus;
}
