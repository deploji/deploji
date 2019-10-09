import { Permissions } from './permissions';

export interface SshKey {
  Permissions?: Permissions;
  ID?: number;
  Title: string;
}
