import { Component, Input, NgModule, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Project } from '../../../../../core/interfaces/project';
import { ProjectsService } from '../../../../../core/services/projects.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormSelectComponentModule } from '../form-select/form-select.component';

@Component({
  selector: 'app-form-project-file',
  templateUrl: './form-project-file.component.html',
})
export class FormProjectFileComponent implements OnChanges {
  @Input() label: string;
  @Input() project: Project;
  @Input() control = new FormControl();
  files: string[] = [];

  constructor(private projectsService: ProjectsService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.project && changes.project.currentValue && changes.project.currentValue.ID > 0) {
      this.projectsService.getProjectFiles(changes.project.currentValue).subscribe(files => {
        this.files = files;
      });
    }
  }

  compareFn(optionOne: string, optionTwo: string): boolean {
    if (!optionOne || !optionTwo) {
      return false;
    }
    return optionOne === optionTwo;
  }

  displayFn(option: string): string {
    return option;
  }
}

@NgModule({
  declarations: [FormProjectFileComponent],
  exports: [FormProjectFileComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    ScrollingModule,
    FormSelectComponentModule
  ]
})
export class FormProjectFileComponentModule { }
