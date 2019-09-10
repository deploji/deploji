import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormProjectFileComponent } from './form-project-file.component';

describe('FormProjectFileComponent', () => {
  let component: FormProjectFileComponent;
  let fixture: ComponentFixture<FormProjectFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormProjectFileComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormProjectFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
