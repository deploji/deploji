import {
  Component,
  ElementRef,
  Input,
  NgModule,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { MatAutocomplete, MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-form-select',
  templateUrl: './form-select.component.html',
})
export class FormSelectComponent implements OnChanges, OnInit, OnDestroy {
  filteredOptions: any[] = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  selectedOptions: any[] = [];
  searchControl = new FormControl();
  private subscription = new Subscription();
  @ViewChild('selectInput') selectInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  @Input() label = 'Application';
  @Input() multiple = false;
  @Input() control = new FormControl();
  @Input() options: any[] = [];
  @Input() compareFn = (optionOne: any, optionTwo: any): boolean => {
    if (!optionOne || !optionTwo) {
      return false;
    }
    return optionOne.ID === optionTwo.ID;
  }
  @Input() displayFn = (option?: any): string | undefined => {
    return option ? option.Name : undefined;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.options && changes.options.currentValue) {
      this.searchControl.setValue('');
    }
    if (changes.control && changes.control.currentValue) {
      this.subscription.add(this.control.valueChanges.subscribe(value => {
        this.propagateChange(value);
      }));
      this.propagateChange(changes.control.currentValue.value);
    }
  }

  ngOnInit(): void {
    this.subscription.add(this.searchControl.valueChanges.pipe(
      map(value => {
        if (typeof value === 'string') {
          return value;
        }
        return value ? value.Name : '';
      }),
      map(value => this._filter(value)),
      map(options => this.updateSelectedState(options))
    ).subscribe(value => {
      this.filteredOptions = value;
    }));
    this.searchControl.setValue(this.searchControl.value || '');
  }

  private updateSelectedState(options) {
    options.forEach(option => {
      if (typeof option === 'object') {
        option.selected = this.selectedOptions.reduce((prev, curr) => prev || this.compareFn(option, curr), false);
      }
    });
    return options;
  }

  private propagateChange(value) {
    this.selectedOptions = !value ? [] : Array.isArray(value) ? value : [value];
    this.updateSelectedState(this.filteredOptions);
  }

  ngOnDestroy(): void {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }
  }

  private _filter(searchString: string): any[] {
    if (!searchString) {
      return this.options;
    }
    const lowerCaseSearchString = searchString.toLowerCase();
    return this.options.filter(option => this.displayFn(option).toLowerCase().includes(lowerCaseSearchString));
  }

  add(event: MatAutocompleteSelectedEvent): void {
    const value = event.option.value;
    if (!this.multiple) {
      this.selectedOptions = [value];
      this.selectInput.nativeElement.blur();
    } else {
      this.selectedOptions.push(value);
    }
    this.selectInput.nativeElement.value = '';
    this.updateValue();
  }

  private updateValue() {
    this.searchControl.setValue('');
    this.control.setValue(this.multiple ? this.selectedOptions : this.selectedOptions.length > 0 ? this.selectedOptions[0] : null);
  }

  remove(option: any): void {
    const index = this.selectedOptions.findIndex(value => option.ID === value.ID);
    if (index >= 0) {
      this.selectedOptions.splice(index, 1);
      this.updateValue();
    }
  }
}

@NgModule({
  declarations: [FormSelectComponent],
  exports: [FormSelectComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    ScrollingModule,
    MatInputModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatIconModule,
  ]
})
export class FormSelectComponentModule {
}
