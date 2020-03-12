import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { SurveyService } from '../../../../core/services/survey.service';
import { Survey } from '../../../../core/interfaces/survey';
import { SurveyInput } from '../../../../core/interfaces/survey-input';
import { SurveyListForm } from '../../../../core/forms/survey-list.form';
import { SurveyDetailsForm } from '../../../../core/forms/survey-details.form';
import { DialogConfirmComponent } from '../../shared/dialog/dialog-confirm/dialog-confirm.component';
import { SurveyInputTypes } from '../../../../core/enums/survey-input-types';

@Component({
  selector: 'app-surveys',
  templateUrl: './surveys.component.html',
  styleUrls: ['./surveys.component.scss']
})
export class SurveysComponent implements OnInit {

  public types: string[] = [SurveyInputTypes.TEXT, SurveyInputTypes.SELECT, SurveyInputTypes.TEXTAREA];
  public surveyTypes = SurveyInputTypes;
  public formList: SurveyListForm = new SurveyListForm();
  public formDetails: SurveyDetailsForm = new SurveyDetailsForm();
  public templateId: number;
  public survey: Survey;
  private surveyIdToEdit: number;
  private subscription: Subscription = new Subscription();

  constructor(
    private surveyService: SurveyService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.templateId = Number(this.route.snapshot.paramMap.get('id'));

    this.getSurvey();

    this.subscribeToForm();
  }

  public createSurvey(): void {
    this.surveyService.createSurvey(this.templateId, {Enabled: false}).subscribe(() => this.getSurvey());
  }

  public deleteSurvey(): void {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '500px',
      data: {message: `Are you sure you want to delete the survey?`}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.surveyService.deleteSurvey(this.templateId).subscribe(() => this.survey = null);
      }
    });
  }

  private getSurvey(): void {
    this.surveyService.getSurvey(this.templateId).subscribe((response: Survey) => {
      this.survey = response;

      this.assignSurveyInputsToForm();
    });
  }

  public isSurveyActive(): boolean {
    return this.survey ? this.survey.Enabled : false;
  }

  public changeSurveyStatus(status: boolean): void {
    this.survey.Enabled = status;
    this.surveyService.updateSurvey(this.templateId, this.survey).subscribe();
  }

  private assignSurveyInputsToForm(): void {
    this.survey.Inputs.forEach((input: SurveyInput) => {
      this.formList.addControl(input.VariableName);
    });
  }

  public parseSelectItems(options: string): Array<any> {
    return options.replace(/\s/g, '').split(',');
  }

  public addControl(): void {
    this.survey.Inputs.push(this.formDetails.new);
    this.formDetails.enable();
  }

  public editExtraVariable(index: number, item: SurveyInput): void {
    this.surveyIdToEdit = index;

    this.formDetails.patchValue(item);
    this.formDetails.enable();
  }

  public save(): void {
    this.resetForm();
    this.saveInputs();
  }

  private resetForm(): void {
    this.surveyIdToEdit = null;
    this.formDetails.reset();
    this.formDetails.disable();
  }

  private saveInputs(): void {
    this.survey.Inputs.forEach((item: SurveyInput) => {
      this.surveyService.sendSurveyInput(this.templateId, item).subscribe(() => this.getSurvey());
    });

    this.snackBar.open('Survey was saved', 'OK', {duration: 3000});
  }

  public deleteExtraVariable(index: number, item: SurveyInput) {
    if (item.ID) {
      this.surveyService.deleteSurveyInput(this.templateId, item).subscribe();
    }

    this.updateSurveyInputList(index);
    this.resetForm();
  }

  private updateSurveyInputList(index: number): void {
    this.survey.Inputs.splice(index, 1);
    this.survey.Inputs = [...this.survey.Inputs];
  }

  private subscribeToForm(): void {
    const formDetailsSub = this.formDetails.valueChanges.subscribe((values: SurveyInput) => {
      if (this.surveyIdToEdit) {
        Object.assign(this.survey.Inputs[this.surveyIdToEdit], values);
      }

      if (values.Type === this.surveyTypes.SELECT) {
        this.formDetails.Options.setValidators([Validators.required]);
      } else {
        this.formDetails.Options.clearValidators();
      }
    });

    this.subscription.add(formDetailsSub);
  }

  get isSelectType(): boolean {
    return this.formDetails.Type.value === this.surveyTypes.SELECT;
  }
}

@NgModule({
  declarations: [SurveysComponent],
  exports: [SurveysComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatSnackBarModule
  ]
})
export class SurveysComponentModule {}
