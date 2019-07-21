import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeploymentDetailsComponent } from './deployment.component';

describe('DeploymentComponent', () => {
  let component: DeploymentDetailsComponent;
  let fixture: ComponentFixture<DeploymentDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeploymentDetailsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeploymentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
