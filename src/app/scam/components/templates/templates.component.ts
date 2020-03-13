import { AfterViewInit, Component, NgModule, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Template } from '../../../core/interfaces/template';
import { TemplatesService } from '../../../core/services/templates.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { TemplateListComponentModule } from '../shared/template-list/template-list.component';
import { TemplateLaunchComponentModule } from '../shared/template-launch/template-launch.component';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
})
export class TemplatesComponent implements OnInit, AfterViewInit {

  @ViewChild('listRef', {static: false}) listRef;
  @ViewChild('launchRef', {static: false}) launchRef;

  templates: Template[] = [];
  selectedTemplate: Template;
  selectedTemplateRef: TemplateRef<any>;

  constructor(private templatesService: TemplatesService) {
  }

  ngOnInit() {
    this.templatesService.getTemplates().subscribe(templates => {
      this.templates = templates;
    });
  }

  launch(template: Template) {
    this.selectedTemplate = template;
    this.selectedTemplateRef = this.launchRef;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.selectedTemplateRef = this.listRef;
    });
  }

  cancel() {
    this.selectedTemplateRef = this.listRef;
  }
}

@NgModule({
  declarations: [TemplatesComponent],
  exports: [TemplatesComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule,
    TemplateListComponentModule,
    TemplateLaunchComponentModule,
  ]
})
export class TemplatesComponentModule {
}
