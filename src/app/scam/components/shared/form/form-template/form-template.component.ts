import { Component, forwardRef, Input, NgModule, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { App } from '../../../../../core/interfaces/app';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TemplatesService } from '../../../../../core/services/templates.service';
import { Template } from '../../../../../core/interfaces/template';

@Component({
  selector: 'app-form-template',
  templateUrl: './form-template.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormTemplateComponent),
      multi: true
    }
  ]
})
export class FormTemplateComponent implements ControlValueAccessor, OnInit {
  @Input() label = 'Template';
  control = new FormControl();
  templates: Template[];
  filteredOptions: Observable<Template[]>;

  constructor(private templatesService: TemplatesService) {
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
      map(value => {
        if (value && typeof value === 'string') {
          return value;
        }
        this.propagateChange(value);
        return value ? value.Name : '';
      }),
      map(value => this._filter(value))
    );
    this.templatesService.getTemplates().subscribe(templates => {
      this.templates = templates;
      this.control.setValue(this.control.value || '');
    });
  }

  displayFn(app?: App): string | undefined {
    return app ? app.Name : undefined;
  }

  private _filter(value: string): App[] {
    const filterValue = value ? value.toLowerCase() : '';
    return this.templates.filter(option => option.Name.toLowerCase().includes(filterValue));
  }

  compareFn(optionOne: App, optionTwo: App): boolean {
    if (!optionOne || !optionTwo) {
      return false;
    }
    return optionOne.ID === optionTwo.ID;
  }
}

@NgModule({
  declarations: [FormTemplateComponent],
  exports: [FormTemplateComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    ScrollingModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class FormTemplateComponentModule { }
