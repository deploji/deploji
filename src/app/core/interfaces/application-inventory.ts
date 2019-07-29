import { App } from './app';
import { Inventory } from './inventory';

export interface ApplicationInventory {
  Application: App;
  Inventory: Inventory;
  InventoryID?: number;
  ApplicationUrls?: string;
  IsActive: boolean;
}
