export interface SurveyInput {
  ID?: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt?: string;
  Label: string;
  VariableName: string;
  Type: string;
  Options: string;
  SurveyID: number;
}
