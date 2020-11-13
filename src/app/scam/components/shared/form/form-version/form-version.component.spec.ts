import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormVersionComponent } from './form-version.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('FormVersionComponent', () => {
  let component: FormVersionComponent;
  let fixture: ComponentFixture<FormVersionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FormVersionComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [MatAutocompleteModule, ScrollingModule, HttpClientTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
