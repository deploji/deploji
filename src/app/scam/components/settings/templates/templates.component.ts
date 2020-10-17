import { Component, NgModule, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmComponent } from '../../shared/dialog/dialog-confirm/dialog-confirm.component';
import { Template } from '../../../../core/interfaces/template';
import { TemplatesService } from '../../../../core/services/templates.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { EditButtonComponentModule } from '../../shared/edit-button/edit-button.component';
import { DeleteButtonComponentModule } from '../../shared/delete-button/delete-button.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { HighlightDirectiveModule } from '../../../directives/highlight.directive';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
})
export class TemplatesComponent implements OnInit, OnDestroy {
  templates: Template[] = [];
  filteredTemplates: Template[] = [];
  columnsToDisplay = ['name', 'project', 'inventory', 'playbook', 'sshkey', 'actions'];
  searchControl = new FormControl();
  private subscription = new Subscription();

  constructor(private templatesService: TemplatesService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.templatesService.getTemplates().subscribe(templates => {
      this.templates = templates;
      this.filteredTemplates = templates;
    });
    this.subscription.add(
      this.searchControl.valueChanges.subscribe((searchText: string) => {
        this.filteredTemplates = this.templates
          .filter(template =>
            template.Name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1 ||
            template.Project?.Name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1 ||
            template.Inventory?.Name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1 ||
            template.Playbook.toLowerCase().indexOf(searchText.toLowerCase()) !== -1);
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  delete(template: Template) {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '500px',
      data: { title: 'Are you sure?', message: `Do you want do delete template ${template.Name}?`}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.templatesService.destroy(template).subscribe(() => {
          this.templates.splice(this.templates.indexOf(template), 1);
          this.filteredTemplates.splice(this.templates.indexOf(template), 1);
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
    MatTableModule,
    EditButtonComponentModule,
    DeleteButtonComponentModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    HighlightDirectiveModule,
  ]
})
export class TemplatesComponentModule {
}
