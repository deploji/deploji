import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CreateInventoryDeploymentComponent } from './create-inventory-deployment.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('CreateInventoryDeploymentComponent', () => {
  let component: CreateInventoryDeploymentComponent;
  let fixture: ComponentFixture<CreateInventoryDeploymentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CreateInventoryDeploymentComponent],
      schemas: [NO_ERRORS_SCHEMA],
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
