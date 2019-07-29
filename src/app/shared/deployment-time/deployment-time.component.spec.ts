import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeploymentTimeComponent } from './deployment-time.component';

describe('DeploymentTimeComponent', () => {
  let component: DeploymentTimeComponent;
  let fixture: ComponentFixture<DeploymentTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeploymentTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeploymentTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
