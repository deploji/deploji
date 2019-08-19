export interface Project {
  synchronizeJobID?: number;
  synchronizationStatus?: string;
  synchronizing?: boolean;
  ID?: number;
  Name: string;
  RepoUrl: string;
  RepoBranch: string;
}
