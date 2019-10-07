import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TemplatesService } from '../../../../core/services/templates.service';
import { TemplateForm } from '../../../../core/forms/template.form';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormProjectComponentModule } from '../../shared/form/form-project/form-project.component';
import { FormInventoryComponentModule } from '../../shared/form/form-inventory/form-inventory.component';
import { FormProjectFileComponentModule } from '../../shared/form/form-project-file/form-project-file.component';
import { FormSshKeyComponentModule } from '../../shared/form/form-ssh-key/form-ssh-key.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { ManagePermissionsComponentModule } from '../../shared/manage-permissions/manage-permissions.component';
import { Template } from '../../../../core/interfaces/template';

@Component({
  selector: 'app-edit-template',
  templateUrl: './edit-template.component.html',
})
export class EditTemplateComponent implements OnInit {
  form = new TemplateForm();
  template: Template;

  constructor(
    private templatesService: TemplatesService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('id')) {
      this.templatesService.getTemplate(Number(this.route.snapshot.paramMap.get('id'))).subscribe(template => {
        this.template = template;
        this.form.patchValue(template);
      });
    }
  }

  save() {
    if (!this.form.valid) {
      return;
    }
    this.templatesService.save(this.form.value).subscribe(() => {
      this.router.navigateByUrl('/settings/templates');
    });
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
  ]
})
export class EditTemplateComponentModule {}
