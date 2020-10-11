import { SshKey } from './ssh-key';
import { Project } from './project';
import { Inventory } from './inventory';
import { Permissions } from './permissions';

export interface Template {
  Permissions?: Permissions;
  PromptSshKey?: boolean;
  PromptVaultKey?: boolean;
  PromptPlaybook?: boolean;
  PromptInventory?: boolean;
  PromptProject?: boolean;
  PromptExtraVariables?: boolean;
  ID?: number;
  Name?: string;
  Inventory?: Inventory;
  Project?: Project;
  Playbook?: string;
  SshKey?: SshKey;
  VaultKey?: SshKey;
  ExtraVariables?: string;
}
