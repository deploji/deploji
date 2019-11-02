import { Component, Input, NgModule, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TemplatesService } from '../../../../../core/services/templates.service';
import { Template } from '../../../../../core/interfaces/template';
import { FormSelectComponentModule } from '../form-select/form-select.component';

@Component({
  selector: 'app-form-template',
  templateUrl: './form-template.component.html',
})
export class FormTemplateComponent implements OnInit {
  @Input() label = 'Template';
  @Input() control = new FormControl();
  @Input() multiple = false;
  templates: Template[] = [];

  constructor(private templatesService: TemplatesService) {
  }

  ngOnInit(): void {
    this.templatesService.getTemplates().subscribe(templates => {
      this.templates = templates;
    });
  }
}

@NgModule({
  declarations: [FormTemplateComponent],
  exports: [FormTemplateComponent],
  imports: [
    CommonModule,
    FormSelectComponentModule,
  ]
})
export class FormTemplateComponentModule { }
