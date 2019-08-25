import { App } from './app';
import { Inventory } from './inventory';
import { SshKey } from './ssh-key';

export interface ApplicationInventory {
  Key: SshKey;
  KeyID: number;
  Application: App;
  Inventory: Inventory;
  InventoryID?: number;
  ApplicationUrls?: string;
  IsActive: boolean;
}
