import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateLaunchComponent } from './template-launch.component';

describe('TemplateLaunchComponent', () => {
  let component: TemplateLaunchComponent;
  let fixture: ComponentFixture<TemplateLaunchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateLaunchComponent ]
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
