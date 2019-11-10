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

  constructor(
    private surveyService: SurveyService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.templateId = Number(this.route.snapshot.paramMap.get('id'));

    this.getSurvey();

    console.log(this.formList);
  }

  private getSurvey(): void {
    this.surveyService.getSurvey(this.templateId).subscribe(
      (response: Survey) => {
        this.survey = response;

        this.assignSurveyInputsToForm();
      },
      (error: HttpErrorResponse) => {
        console.error(error);
        // throw new Error(error.message);
      });
  }

  private assignSurveyInputsToForm() {
    this.survey.Inputs.forEach((input: SurveyInput) => {
      console.log(input)
      this.formList.addControl(input.VariableName);
    });
  }

  public addControl(): void {
    console.log(this.survey.Inputs);
    // this.survey.Inputs.push({});
  }

  public editExtraVariable(item: SurveyInput): void {
    console.log(item);
    this.formDetails.enable();
    this.formDetails.patchValue(item);
  }

  public save(): void {
    // todo
  }

  public deleteExtraVariable(item: SurveyInput) {
    // todo
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
