import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DurationComponent } from './duration.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DurationPipeModule } from '../../../pipes/duration.pipe';

describe('DurationComponent', () => {
  let component: DurationComponent;
  let fixture: ComponentFixture<DurationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DurationComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [DurationPipeModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
