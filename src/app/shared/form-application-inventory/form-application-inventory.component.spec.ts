import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormApplicationInventoryComponent } from './form-application-inventory.component';

describe('FormInventoryComponent', () => {
  let component: FormApplicationInventoryComponent;
  let fixture: ComponentFixture<FormApplicationInventoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
