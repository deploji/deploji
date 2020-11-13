import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { JobDetailsComponent } from './job-details.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AnsiPipeModule } from '../../../pipes/ansi.pipe';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RxStompServiceTestingModule } from '../../../../testing/rx-stomp-service.mock';

describe('JobDetailsComponent', () => {
  let component: JobDetailsComponent;
  let fixture: ComponentFixture<JobDetailsComponent>;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [JobDetailsComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [AnsiPipeModule, ScrollingModule, HttpClientTestingModule, RouterTestingModule, RxStompServiceTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
