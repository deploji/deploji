import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSshKeyComponent } from './form-ssh-key.component';

describe('FormSshKeyComponent', () => {
  let component: FormSshKeyComponent;
  let fixture: ComponentFixture<FormSshKeyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormSshKeyComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSshKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
