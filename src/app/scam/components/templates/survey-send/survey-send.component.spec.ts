import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SurveySendComponent } from './survey-send.component';

describe('SurveySendComponent', () => {
  let component: SurveySendComponent;
  let fixture: ComponentFixture<SurveySendComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveySendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    const survey = {
      Inputs: [],
      Enabled: true
    };

    fixture = TestBed.createComponent(SurveySendComponent);
    component = fixture.componentInstance;
    component.survey = survey;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
