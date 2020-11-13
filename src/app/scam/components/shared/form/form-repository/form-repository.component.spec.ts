import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormRepositoryComponent } from './form-repository.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('FormRepositoryComponent', () => {
  let component: FormRepositoryComponent;
  let fixture: ComponentFixture<FormRepositoryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FormRepositoryComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [HttpClientTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRepositoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
