import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormSelectComponent, FormSelectComponentModule } from './form-select.component';

@Component({
  template: `<app-form-select [options]="apps" [control]="form.get('app')" label="Apps"></app-form-select>`
})
export class TestWrapperComponent {
  form = new FormGroup({ app: new FormControl({ID: 2, Name: 'Deploji server'}, [Validators.required])});
  apps = [
    {ID: 1, Name: 'Deploji front'},
    {ID: 2, Name: 'Deploji server'},
    {ID: 3, Name: 'Deploji worker'},
  ];
}

describe('FormSelectComponent', () => {
  let component: FormSelectComponent;
  let fixture: ComponentFixture<TestWrapperComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormSelectComponentModule,
        NoopAnimationsModule,
        HttpClientTestingModule,
      ],
      declarations: [
        TestWrapperComponent,
      ]
    })
      .compileComponents();
    fixture = TestBed.createComponent(TestWrapperComponent);
    component = fixture.debugElement.children[0].componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render label', () => {
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('mat-label')).nativeElement.innerText).toEqual('Apps');
  });

  it('should render selected option in mat-chip', () => {
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('mat-chip')).nativeElement.innerText).toContain('Deploji server');
  });
});
