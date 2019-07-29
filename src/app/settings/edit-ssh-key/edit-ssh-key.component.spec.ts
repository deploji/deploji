import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSshKeyComponent } from './edit-ssh-key.component';

describe('EditSshKeyComponent', () => {
  let component: EditSshKeyComponent;
  let fixture: ComponentFixture<EditSshKeyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditSshKeyComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSshKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should save', () => {
    expect(component).toBeTruthy();
  });
});
