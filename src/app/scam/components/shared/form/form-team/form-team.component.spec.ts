import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTeamComponent } from './form-team.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('FormVersionComponent', () => {
  let component: FormTeamComponent;
  let fixture: ComponentFixture<FormTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormTeamComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [MatAutocompleteModule, ScrollingModule, HttpClientTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
