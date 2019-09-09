import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Template } from '../../core/interfaces/template';
import { TemplatesService } from '../../core/services/templates.service';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
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
    this.selectedTemplateRef = this.listRef;
  }

  cancel() {
    this.selectedTemplateRef = this.listRef;
  }
}
