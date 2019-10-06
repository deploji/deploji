import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormApplicationComponent } from './form-application.component';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { AppsService } from '../../../../../core/services/apps.service';
import { Observable, of } from 'rxjs';
import { App } from '../../../../../core/interfaces/app';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  template: `
    <form [formGroup]="form">
      <app-form-application formControlName="app" label="App"></app-form-application>
    </form>
  `
})
export class TestWrapperComponent {
  form = new FormGroup({app: new FormControl({ID: 1}, [Validators.required])});
}

class AppServiceMock {
  getApps(): Observable<App[]> {
    return of([
      {ID: 1, Name: 'Deploji'},
      {ID: 2, Name: 'Fake App'},
    ]);
  }
}

describe('FormApplicationComponent', () => {
  let component: FormApplicationComponent;
  let fixture: ComponentFixture<TestWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        ScrollingModule,
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule,
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{provide: AppsService, useClass: AppServiceMock}],
      declarations: [
        FormApplicationComponent,
        TestWrapperComponent,
      ]
    })
      .compileComponents();
    fixture = TestBed.createComponent(TestWrapperComponent);
    component = fixture.debugElement.children[0].children[0].componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display label', () => {
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('mat-label')).nativeElement.innerText).toEqual('App');
  });
});
