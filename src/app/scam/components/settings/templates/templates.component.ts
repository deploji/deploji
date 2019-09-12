import { Component, NgModule, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogConfirmComponent } from '../../dialog/dialog-confirm/dialog-confirm.component';
import { Template } from '../../../../core/interfaces/template';
import { TemplatesService } from '../../../../core/services/templates.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
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

@NgModule({
    declarations: [TemplatesComponent],
    exports: [TemplatesComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule,
    MatCardModule,
    MatIconModule,
  ]
})
export class TemplatesComponentModule {}
