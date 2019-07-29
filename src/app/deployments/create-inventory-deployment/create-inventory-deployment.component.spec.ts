import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInventoryDeploymentComponent } from './create-inventory-deployment.component';

describe('CreateInventoryDeploymentComponent', () => {
  let component: CreateInventoryDeploymentComponent;
  let fixture: ComponentFixture<CreateInventoryDeploymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateInventoryDeploymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateInventoryDeploymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
