import { ObjectTypesEnum } from '../enums/object-types.enum';
import { SubjectTypesEnum } from '../enums/subject-types.enum';

export interface Permission {
  SubjectType?: SubjectTypesEnum;
  SubjectID?: number;
  SubjectName?: string;
  ObjectType?: ObjectTypesEnum;
  ObjectID?: number;
  ObjectName?: string;
  Action?: string;
}
