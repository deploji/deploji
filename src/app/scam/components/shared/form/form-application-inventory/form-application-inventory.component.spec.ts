import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormApplicationInventoryComponent } from './form-application-inventory.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('FormInventoryComponent', () => {
  let component: FormApplicationInventoryComponent;
  let fixture: ComponentFixture<FormApplicationInventoryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      declarations: [FormApplicationInventoryComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormApplicationInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
