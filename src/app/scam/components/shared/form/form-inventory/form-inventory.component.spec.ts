import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormInventoryComponent } from './form-inventory.component';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Inventory } from '../../../../../core/interfaces/inventory';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { InventoriesService } from '../../../../../core/services/inventories.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatInputModule } from '@angular/material/input';

@Component({
  template: `
    <form [formGroup]="form">
      <app-form-inventory formControlName="inventory" label="Inventory"></app-form-inventory>
    </form>
  `
})
export class TestWrapperComponent {
  form = new FormGroup({inventory: new FormControl({ID: 1}, [Validators.required])});
}

class InventoriesServiceMock {
  getInventories(): Observable<Inventory[]> {
    return of([
      {ID: 1, Name: 'Fake inventory 1'},
      {ID: 2, Name: 'Fake inventory 2'},
    ]);
  }
}

describe('FormInventoryComponent', () => {
  let component: FormInventoryComponent;
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
      declarations: [
        FormInventoryComponent,
        TestWrapperComponent,
      ],
      providers: [
        {provide: InventoriesService, useClass: InventoriesServiceMock}
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
    expect(fixture.debugElement.query(By.css('mat-label')).nativeElement.innerText).toEqual('Inventory');
  });
});
