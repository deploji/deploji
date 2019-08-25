import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobTimeComponent } from './job-time.component';

describe('DeploymentTimeComponent', () => {
  let component: JobTimeComponent;
  let fixture: ComponentFixture<JobTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobTimeComponent ]
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
