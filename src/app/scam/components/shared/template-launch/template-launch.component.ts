import { Component, EventEmitter, Input, NgModule, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Template } from '../../../../core/interfaces/template';
import { JobTypesEnum } from '../../../../core/enums/job-types.enum';
import { JobsService } from '../../../../core/services/jobs.service';
import { TemplateForm } from '../../../../core/forms/template.form';
import { FormProjectComponentModule } from '../form/form-project/form-project.component';
import { FormInventoryComponentModule } from '../form/form-inventory/form-inventory.component';
import { FormProjectFileComponentModule } from '../form/form-project-file/form-project-file.component';
import { FormSshKeyComponentModule } from '../form/form-ssh-key/form-ssh-key.component';
import { SurveyService } from '../../../../core/services/survey.service';
import { Survey } from '../../../../core/interfaces/survey';
import { SurveySendComponentModule } from '../../templates/survey-send/survey-send.component';
import { SurveyInputManagerService } from '../../../../core/services/survey-input-manager.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-template-launch',
  templateUrl: './template-launch.component.html',
})
export class TemplateLaunchComponent implements OnInit, OnChanges, OnDestroy {
  @Input() template: Template;
  @Output() cancelEvent = new EventEmitter<void>();

  public form = new TemplateForm();
  public survey: Survey;
  private predefinedExtraVars = '';
  private subscription: Subscription = new Subscription();

  constructor(
    private jobsService: JobsService,
    private router: Router,
    private surveyService: SurveyService,
    private surveyInputManager: SurveyInputManagerService
  ) {
  }

  ngOnInit() {
    this.surveyInputManager.inputSource.subscribe((extraVars: string) => {
      this.predefinedExtraVars = extraVars;
      console.log(this.predefinedExtraVars);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.template) {
      this.form.patchValue(changes.template.currentValue);

      this.surveyService.getSurvey(changes.template.currentValue.ID).subscribe((survey: Survey) => {
        this.survey = survey;

        if (!this.hasPrompt(changes.template.currentValue) && survey.Inputs.length === 0) {
          this.save();
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private hasPrompt(template: Template): boolean {
    if (!template) {
      return false;
    }

    return template.PromptInventory ||
           template.PromptPlaybook ||
           template.PromptProject ||
           template.PromptSshKey ||
           template.PromptExtraVariables;
  }

  save() {
    this.jobsService.save({
      Template: this.template,
      ProjectID: this.form.Project.value.ID,
      InventoryID: this.form.Inventory.value.ID,
      Playbook: this.form.Playbook.value,
      KeyID: this.form.SshKey.value.ID,
      ExtraVariables: this.allExtraVars(),
      Type: JobTypesEnum.JOB
    }).subscribe(job => {
      this.router.navigateByUrl(`/jobs/${job.ID}`);
    });
  }

  private allExtraVars(): string {
    console.log(`${this.form.ExtraVariables.value.replace(/=/g, ':')}\n${this.predefinedExtraVars}`);
    return `${this.form.ExtraVariables.value.replace(/=/g, ':')}\n${this.predefinedExtraVars}`;
  }

  cancel() {
    this.cancelEvent.emit();
  }
}

@NgModule({
  declarations: [TemplateLaunchComponent],
  exports: [TemplateLaunchComponent],
  imports: [
    CommonModule,
    MatCardModule,
    ReactiveFormsModule,
    FormProjectComponentModule,
    FormInventoryComponentModule,
    FormProjectFileComponentModule,
    FormSshKeyComponentModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    SurveySendComponentModule
  ]
})
export class TemplateLaunchComponentModule { }
