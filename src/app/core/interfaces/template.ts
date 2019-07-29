import { SshKey } from './ssh-key';
import { Project } from './project';
import { Inventory } from './inventory';

export interface Template {
  ID?: number;
  Name?: string;
  Inventory?: Inventory;
  Project?: Project;
  Playbook?: string;
  SshKey?: SshKey;
}
