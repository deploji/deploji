import { App } from './app';
import { Inventory } from './inventory';

export interface Deployment {
  ID?: number;
  Application: App;
  Inventory: Inventory;
  Version: string;
  CreatedAt: any;
}
