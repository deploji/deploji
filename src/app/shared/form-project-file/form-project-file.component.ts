import { Component, forwardRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Project } from '../../core/interfaces/project';
import { Observable, Subscription } from 'rxjs';
import { ProjectsService } from '../../core/services/projects.service';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-form-project-file',
  templateUrl: './form-project-file.component.html',
  styleUrls: ['./form-project-file.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormProjectFileComponent),
      multi: true
    }
  ]
})
export class FormProjectFileComponent implements ControlValueAccessor, OnInit, OnDestroy, OnChanges {
  @Input() label: string;
  @Input() project: Project;
  control = new FormControl();
  files: string[];
  filteredOptions: Observable<string[]>;
  private subscription: Subscription;

  constructor(private projectsService: ProjectsService) {
  }

  propagateChange = (_: any) => {};

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
    this.control.disable();
  }

  writeValue(obj: any): void {
    this.control.setValue(obj);
  }

  ngOnInit(): void {
    this.filteredOptions = this.control.valueChanges.pipe(
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

  ngOnDestroy(): void {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }
  }

  compareFn(optionOne: string, optionTwo: string): boolean {
    if (!optionOne || !optionTwo) {
      return false;
    }
    return optionOne === optionTwo;
  }
}
