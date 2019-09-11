import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormApplicationComponent } from './form-application.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ScrollingModule } from '@angular/cdk/scrolling';

describe('FormApplicationComponent', () => {
  let component: FormApplicationComponent;
  let fixture: ComponentFixture<FormApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatAutocompleteModule, ScrollingModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [FormApplicationComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
