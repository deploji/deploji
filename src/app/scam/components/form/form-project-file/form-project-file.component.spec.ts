import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormProjectFileComponent } from './form-project-file.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ScrollingModule } from '@angular/cdk/scrolling';

describe('FormProjectFileComponent', () => {
  let component: FormProjectFileComponent;
  let fixture: ComponentFixture<FormProjectFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatAutocompleteModule, ScrollingModule],
      declarations: [FormProjectFileComponent],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormProjectFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
