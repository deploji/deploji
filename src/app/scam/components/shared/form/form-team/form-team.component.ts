import { Component, forwardRef, Input, NgModule, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { Team } from '../../../../../core/interfaces/team';
import { TeamsService } from '../../../../../core/services/teams.service';

@Component({
  selector: 'app-form-team',
  templateUrl: './form-team.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormTeamComponent),
      multi: true
    }
  ]
})
export class FormTeamComponent implements ControlValueAccessor, OnInit, OnDestroy {
  @Input() label = 'Team';
  @Input() teams: Team[];
  control = new FormControl();
  filteredOptions: Team[];
  private subscription: Subscription;

  constructor(private teamsService: TeamsService) {
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
    this.control.valueChanges.pipe(
      map(value => {
        if (value && typeof value === 'string') {
          return value;
        }
        this.propagateChange(value);
        return value ? value.Teamname : '';
      }),
      map(value => this._filter(value))
    ).subscribe(value => {
      this.filteredOptions = value;
    });
    if (!this.teams) {
      this.teamsService.getTeams().subscribe(teams => {
        this.teams = teams;
        this.filteredOptions = teams;
      });
    }
  }

  private _filter(value: string): Team[] {
    const filterValue = value ? value.toLowerCase() : '';
    if (!this.teams) {
      return [];
    }
    return this.teams.filter(option => option.Name.toLowerCase().includes(filterValue));
  }

  ngOnDestroy(): void {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }
  }

  displayFn(team?: Team): string | undefined {
    return team ? team.Name : undefined;
  }

  compareFn(optionOne: string, optionTwo: string): boolean {
    if (!optionOne || !optionTwo) {
      return false;
    }
    return optionOne === optionTwo;
  }
}

@NgModule({
  declarations: [FormTeamComponent],
  exports: [FormTeamComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    ScrollingModule
  ]
})
export class FormTeamComponentModule { }
