import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveySendComponent } from './survey-send.component';

describe('SurveySendComponent', () => {
  let component: SurveySendComponent;
  let fixture: ComponentFixture<SurveySendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveySendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveySendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
