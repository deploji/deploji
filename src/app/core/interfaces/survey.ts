import { SurveyInput } from './survey-input';

export interface Survey {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string;
  Enabled: boolean;
  Inputs: SurveyInput[];
  TemplateID: number;
}
