import { Component, Input, NgModule, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Subscription } from 'rxjs';
import { Survey } from '../../../../core/interfaces/survey';
import { SurveyListForm } from '../../../../core/forms/survey-list.form';
import { SurveyInputTypes } from '../../../../core/enums/survey-input-types';
import { SurveyInputManagerService } from '../../../../core/services/survey-input-manager.service';

@Component({
  selector: 'app-survey-send',
  templateUrl: './survey-send.component.html',
  styles: []
})
export class SurveySendComponent implements OnInit, OnDestroy {

  @Input()
  public survey: Survey;
  public form: SurveyListForm = new SurveyListForm();
  public surveyTypes = SurveyInputTypes;
  private subscription: Subscription = new Subscription();

  constructor(
    private surveyInputManager: SurveyInputManagerService
  ) {}

  ngOnInit() {
    this.createControls();
    this.subscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private createControls(): void {
    this.survey.Inputs.forEach(() => {
      this.form.extraVariables.push(new FormControl());
    });
  }

  public selectItems(hint: string): string[] {
    return hint.replace(/\s/g, '').split(',');
  }

  private subscribe(): void {
    const extraVarsSubscription = this.form.extraVariables.valueChanges.subscribe((values: any) => {
      this.surveyInputManager.send(this.survey, values);
    });

    this.subscription.add(extraVarsSubscription);
  }
}

@NgModule({
  declarations: [SurveySendComponent],
  exports: [SurveySendComponent],
  imports: [
    CommonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule
  ]
})
export class SurveySendComponentModule {}
