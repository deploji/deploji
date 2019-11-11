import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { SurveyService } from '../../../../core/services/survey.service';
import { Survey } from '../../../../core/interfaces/survey';
import { SurveyInput } from '../../../../core/interfaces/survey-input';
import { SurveyListForm } from '../../../../core/forms/survey-list.form';
import { SurveyDetailsForm } from '../../../../core/forms/survey-details.form';

@Component({
  selector: 'app-surveys',
  templateUrl: './surveys.component.html',
  styleUrls: ['./surveys.component.scss']
})
export class SurveysComponent implements OnInit {

  public formList: SurveyListForm = new SurveyListForm();
  public formDetails: SurveyDetailsForm = new SurveyDetailsForm();
  public templateId: number;
  public survey: Survey;
  private surveyIdToEdit: number;

  constructor(
    private surveyService: SurveyService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.templateId = Number(this.route.snapshot.paramMap.get('id'));

    this.getSurvey();

    this.subscribeToForm();
  }

  private getSurvey(): void {
    this.surveyService.getSurvey(this.templateId).subscribe(
      (response: Survey) => {
        this.survey = response;

        this.assignSurveyInputsToForm();
      },
      (error: HttpErrorResponse) => {
        console.error(error);
      });
  }

  private assignSurveyInputsToForm(): void {
    this.survey.Inputs.forEach((input: SurveyInput) => {
      this.formList.addControl(input.VariableName);
    });
  }

  public addControl(): void {
    this.survey.Inputs.push(this.formDetails.new);
  }

  public editExtraVariable(index: number, item: SurveyInput): void {
    this.surveyIdToEdit = index;

    this.formDetails.patchValue(item);
    this.formDetails.enable();
  }

  public save(): void {
    this.surveyIdToEdit = null;
    this.formDetails.reset();
    this.formDetails.disable();

    this.saveInputs();
  }

  private saveInputs(): void {
    this.survey.Inputs.forEach((item: SurveyInput) => {
      if (item.ID) {
        this.surveyService.updateSurveyInput(this.templateId, item).subscribe();
      } else {
        this.surveyService.createSurveyInput(this.templateId, item).subscribe();
      }
    });
  }

  public deleteExtraVariable(index: number, item: SurveyInput) {
    this.surveyService.deleteSurveyInput(this.templateId, item).subscribe(() => {
      this.survey.Inputs.splice(index, 1);
      this.survey.Inputs = [...this.survey.Inputs];
    });
  }

  private subscribeToForm() {
    this.formDetails.valueChanges.subscribe((values) => {
      if (this.surveyIdToEdit) {
        this.survey.Inputs[this.surveyIdToEdit].Label = values.Label;
        this.survey.Inputs[this.surveyIdToEdit].VariableName = values.VariableName;
        this.survey.Inputs[this.surveyIdToEdit].Hint = values.Hint;
        this.survey.Inputs[this.surveyIdToEdit].Type = values.Type;
      }
    });
  }
}

@NgModule({
  declarations: [SurveysComponent],
  exports: [SurveysComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule
  ]
})
export class SurveysComponentModule {}
