export interface Survey {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string;
  Enabled: boolean;
  Inputs: any[];
  TemplateID: number;
}
