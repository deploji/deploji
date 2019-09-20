import { App } from './app';
import { Inventory } from './inventory';
import { SshKey } from './ssh-key';

export interface ApplicationInventory {
  ID: number;
  Version?: string;
  Key: SshKey;
  KeyID: number;
  Application: App;
  ApplicationID?: number;
  Inventory: Inventory;
  InventoryID?: number;
  ApplicationUrls?: string;
  ExtraVariables?: string;
  Name?: string;
  IsActive: boolean;
  Playbook: string;
}
