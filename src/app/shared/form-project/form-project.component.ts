import { Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ProjectsService } from '../../core/services/projects.service';
import { Project } from '../../core/interfaces/project';

@Component({
  selector: 'app-form-project',
  templateUrl: './form-project.component.html',
  styleUrls: ['./form-project.component.scss'],
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
