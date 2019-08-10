import { Setting } from './setting';

export interface SettingGroup {
  ID?: number;
  Name?: string;
  Settings?: Setting[];
}
