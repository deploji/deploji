import { SshKey } from './ssh-key';
import { Project } from './project';
import { Inventory } from './inventory';

export interface Template {
  PromptSshKey?: boolean;
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
  ExtraVariables?: string;
}
