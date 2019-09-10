import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSynchronizeComponent } from './dialog-synchronize.component';

describe('DialogSynchronizeComponent', () => {
  let component: DialogSynchronizeComponent;
  let fixture: ComponentFixture<DialogSynchronizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogSynchronizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSynchronizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
