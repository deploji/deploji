import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormActionTypeComponent } from './form-action-type.component';
import { Component } from '@angular/core';
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
import { ObjectTypesEnum } from '../../../../../core/enums/object-types.enum';
import { MatSelectModule } from '@angular/material/select';

@Component({
  template: `
    <form [formGroup]="form">
      <app-form-action-type [type]="ObjectTypesEnum.TEMPLATES" formControlName="app" label="App"></app-form-action-type>
    </form>
  `
})
export class TestWrapperComponent {
  ObjectTypesEnum = ObjectTypesEnum;
  form = new FormGroup({ app: new FormControl({ ID: 1}, [Validators.required])});
}

class AppServiceMock {
  getApps(): Observable<App[]> {
    return of([
      { ID: 1, Name: 'Deploji'},
      { ID: 2, Name: 'Fake App'},
    ]);
  }
}

describe('FormActionTypeComponent', () => {
  let component: FormActionTypeComponent;
  let fixture: ComponentFixture<TestWrapperComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatSelectModule,
        ScrollingModule,
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule,
      ],
      providers: [{ provide: AppsService, useClass: AppServiceMock}],
      declarations: [
        FormActionTypeComponent,
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
