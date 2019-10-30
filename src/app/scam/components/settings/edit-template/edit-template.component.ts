import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { TemplatesService } from '../../../../core/services/templates.service';
import { TemplateForm } from '../../../../core/forms/template.form';
import { FormProjectComponentModule } from '../../shared/form/form-project/form-project.component';
import { FormInventoryComponentModule } from '../../shared/form/form-inventory/form-inventory.component';
import { FormProjectFileComponentModule } from '../../shared/form/form-project-file/form-project-file.component';
import { FormSshKeyComponentModule } from '../../shared/form/form-ssh-key/form-ssh-key.component';
import { ManagePermissionsComponentModule } from '../../shared/manage-permissions/manage-permissions.component';
import { Template } from '../../../../core/interfaces/template';
import { NotificationChannelsService } from '../../../../core/services/notification-channels.service';
import { NotificationsWhenComponent, NotificationsWhenComponentModule } from '../../shared/notifications-when/notifications-when.component';

@Component({
  selector: 'app-edit-template',
  templateUrl: './edit-template.component.html',
})
export class EditTemplateComponent implements OnInit {

  @ViewChild(NotificationsWhenComponent, {static: false})
  public notificationsWhenComponentRef: any;

  public form = new TemplateForm();
  public template: Template;
  public templateId: number;

  constructor(
    private templatesService: TemplatesService,
    private notchaService: NotificationChannelsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.templateId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.templateId) {
      this.templatesService.getTemplate(this.templateId).subscribe(template => {
        this.template = template;
        this.form.patchValue(template);
      });
    }
  }

  public save(): void {
    if (this.form.valid) {
      this.templatesService.save(this.form.value).subscribe((response: Template) => {
        this.router.navigateByUrl('/settings/templates');
      });
    }
  }
}

@NgModule({
  declarations: [EditTemplateComponent],
  exports: [EditTemplateComponent],
  imports: [
    CommonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    FormProjectComponentModule,
    FormInventoryComponentModule,
    FormProjectFileComponentModule,
    FormSshKeyComponentModule,
    MatButtonModule,
    RouterModule,
    MatTabsModule,
    ManagePermissionsComponentModule,
    NotificationsWhenComponentModule
  ]
})
export class EditTemplateComponentModule { }
