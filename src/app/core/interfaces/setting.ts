import { SettingGroup } from './setting-group';

export interface Setting {
  ID?: number;
  Group?: SettingGroup;
  GroupID?: number;
  Key?: string;
  Value?: string;
  BoolValue?: boolean;
  ValueType: string;
  Description?: string;
  Label?: string;
}
