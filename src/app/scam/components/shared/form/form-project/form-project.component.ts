import { Component, forwardRef, Input, NgModule, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ProjectsService } from '../../../../../core/services/projects.service';
import { Project } from '../../../../../core/interfaces/project';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-form-project',
  templateUrl: './form-project.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormProjectComponent),
      multi: true
    }
  ]
})
export class FormProjectComponent implements ControlValueAccessor, OnInit, OnDestroy {
  @Input() label = 'Project';
  control = new FormControl();
  projects: Project[];
  private subscription: Subscription;

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
    this.projectsService.getProjects().subscribe(projects => {
      this.projects = projects;
    });
    this.subscription = this.control.valueChanges.subscribe(value => {
      this.propagateChange(value);
    });
  }

  ngOnDestroy(): void {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }
  }

  compareFn(optionOne: Project, optionTwo: Project): boolean {
    if (!optionOne || !optionTwo) {
      return false;
    }
    return optionOne.ID === optionTwo.ID;
  }
}

@NgModule({
  declarations: [FormProjectComponent],
  exports: [FormProjectComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule
  ]
})
export class FormProjectComponentModule { }
