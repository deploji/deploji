import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Template } from '../../core/interfaces/template';
import { JobTypesEnum } from '../../core/enums/job-types.enum';
import { JobsService } from '../../core/services/jobs.service';
import { Router } from '@angular/router';
import { TemplateForm } from '../../core/forms/template.form';

@Component({
  selector: 'app-template-launch',
  templateUrl: './template-launch.component.html',
  styleUrls: ['./template-launch.component.scss']
})
export class TemplateLaunchComponent implements OnChanges {
  @Input() template: Template;
  @Output() cancelEvent = new EventEmitter<void>();

  form = new TemplateForm();

  constructor(private jobsService: JobsService, private router: Router) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.form.patchValue(changes.template.currentValue);
    if (!this.hasPrompt(changes.template.currentValue)) {
      this.save();
    }
  }

  private hasPrompt(template: Template): boolean {
    return template.PromptInventory
      || template.PromptPlaybook
      || template.PromptProject
      || template.PromptSshKey
      || template.PromptExtraVariables;
  }

  save() {
    this.jobsService.save({
      Template: this.template,
      ProjectID: this.form.Project.value.ID,
      InventoryID: this.form.Inventory.value.ID,
      Playbook: this.form.Playbook.value,
      KeyID: this.form.SshKey.value.ID,
      ExtraVariables: this.form.ExtraVariables.value,
      Type: JobTypesEnum.JOB
    }).subscribe(job => {
      this.router.navigateByUrl(`/jobs/${job.ID}`);
    });
  }

  cancel() {
    this.cancelEvent.emit();
  }
}
