import { Component, forwardRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Project } from '../../core/interfaces/project';
import { Subscription } from 'rxjs';
import { ProjectsService } from '../../core/services/projects.service';
import { ProjectFile } from '../../core/interfaces/project-file';

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
  files: ProjectFile[];
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
    this.subscription = this.control.valueChanges.subscribe(value => {
      this.propagateChange(value);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.project && changes.project.currentValue && changes.project.currentValue.ID > 0) {
      this.projectsService.getProjectFiles(changes.project.currentValue).subscribe(files => {
        this.files = files;
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
