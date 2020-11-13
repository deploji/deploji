import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormSshKeyComponent } from './form-ssh-key.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('FormSshKeyComponent', () => {
  let component: FormSshKeyComponent;
  let fixture: ComponentFixture<FormSshKeyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FormSshKeyComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [HttpClientTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSshKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
