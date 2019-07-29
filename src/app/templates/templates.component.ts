import { Component, OnInit } from '@angular/core';
import { Template } from '../core/interfaces/template';
import { TemplatesService } from '../core/services/templates.service';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent implements OnInit {
  templates: Template[] = [];

  constructor(private templatesService: TemplatesService) {
  }

  ngOnInit() {
    this.templatesService.getTemplates().subscribe(templates => {
      this.templates = templates;
    });
  }

  launch(template: Template) {

  }
}
