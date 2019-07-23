import { JobStatus } from '../enums/job-status.enum';

export interface StatusMessage {
  ID?: number;
  Status: JobStatus;
}
