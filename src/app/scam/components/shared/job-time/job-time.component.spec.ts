import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { JobTimeComponent } from './job-time.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TimeAgoPipeModule } from '../../../pipes/time-ago.pipe';

describe('JobTimeComponent', () => {
  let component: JobTimeComponent;
  let fixture: ComponentFixture<JobTimeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [JobTimeComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [TimeAgoPipeModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
