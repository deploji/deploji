import { App } from './app';
import { Inventory } from './inventory';
import { JobStatus } from '../enums/job-status.enum';

export interface Deployment {
  ID?: number;
  Application: App;
  Inventory: Inventory;
  Version: string;
  CreatedAt: any;
  Status: JobStatus;
}
