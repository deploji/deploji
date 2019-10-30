import { Component, forwardRef, Input, NgModule, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { Project } from '../../../../../core/interfaces/project';
import { Observable } from 'rxjs';
import { ProjectsService } from '../../../../../core/services/projects.service';
import { map, tap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-form-project-file',
  templateUrl: './form-project-file.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormProjectFileComponent),
      multi: true
    }
  ]
})
export class FormProjectFileComponent implements ControlValueAccessor, OnInit, OnChanges {
  @Input() label: string;
  @Input() project: Project;
  control = new FormControl();
  files: string[] = [];
  filteredOptions: Observable<string[]>;

  constructor(private projectsService: ProjectsService) {
  }

  propagateChange = (_: any) => {
    // do nothing
  }

  onTouched = (_: any) => {
    // do nothing
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.control.disable() : this.control.enable();
  }

  writeValue(obj: any): void {
    this.control.setValue(obj);
  }

  ngOnInit(): void {
    this.filteredOptions = this.control.valueChanges.pipe(
      map(value => value ? value : ''),
      tap(value => this.propagateChange(value)),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.files.filter(option => option.toLowerCase().includes(filterValue));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.project && changes.project.currentValue && changes.project.currentValue.ID > 0) {
      this.projectsService.getProjectFiles(changes.project.currentValue).subscribe(files => {
        this.files = files;
        this.control.setValue(this.control.value || '');
      });
    }
  }

  compareFn(optionOne: string, optionTwo: string): boolean {
    if (!optionOne || !optionTwo) {
      return false;
    }
    return optionOne === optionTwo;
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
    ScrollingModule
  ]
})
export class FormProjectFileComponentModule { }
