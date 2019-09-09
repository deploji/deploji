import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogConfirmComponent } from '../../../shared/dialog/dialog-confirm/dialog-confirm.component';
import { Template } from '../../../core/interfaces/template';
import { TemplatesService } from '../../../core/services/templates.service';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent implements OnInit {
  templates: Template[] = [];

  constructor(private templatesService: TemplatesService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.templatesService.getTemplates().subscribe(templates => {
      this.templates = templates;
    });
  }

  delete(template: Template) {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '500px',
      data: {title: 'Are you sure?', message: `Do you want do delete template ${template.Name}?`}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.templatesService.destroy(template).subscribe(() => {
          this.templates.splice(this.templates.indexOf(template), 1);
        });
      }
    });
  }
}
