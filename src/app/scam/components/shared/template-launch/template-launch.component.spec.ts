import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateLaunchComponent } from './template-launch.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('TemplateLaunchComponent', () => {
  let component: TemplateLaunchComponent;
  let fixture: ComponentFixture<TemplateLaunchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TemplateLaunchComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [HttpClientTestingModule, RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateLaunchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
