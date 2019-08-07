import { Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Project } from '../../core/interfaces/project';
import { Subscription } from 'rxjs';
import { RepositoriesService } from '../../core/services/repositories.service';
import { Repository } from '../../core/interfaces/repository';

@Component({
  selector: 'app-form-repository',
  templateUrl: './form-repository.component.html',
  styleUrls: ['./form-repository.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormRepositoryComponent),
      multi: true
    }
  ]
})
export class FormRepositoryComponent implements ControlValueAccessor, OnInit, OnDestroy {
  @Input() label: string;
  @Input() project: Project;
  control = new FormControl();
  repositories: Repository[];
  private subscription: Subscription;

  constructor(private repositoriesService: RepositoriesService) {
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
    this.repositoriesService.getRepositories().subscribe(repositories => {
      this.repositories = repositories;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }
  }

  compareFn(optionOne: Repository, optionTwo: Repository): boolean {
    if (!optionOne || !optionTwo) {
      return false;
    }
    return optionOne.ID === optionTwo.ID;
  }
}
