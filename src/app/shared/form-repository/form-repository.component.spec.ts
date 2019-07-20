import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRepositoryComponent } from './form-repository.component';

describe('FormRepositoryComponent', () => {
  let component: FormRepositoryComponent;
  let fixture: ComponentFixture<FormRepositoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormRepositoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRepositoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
