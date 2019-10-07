import { UserTypesEnum } from '../enums/user-types.enum';

export interface User {
  ID?: number;
  Name?: string;
  Surname?: string;
  Username?: string;
  Email?: string;
  Password?: string;
  IsActive?: string;
  Team?: string;
  Role?: string;
  Type?: UserTypesEnum;
}
