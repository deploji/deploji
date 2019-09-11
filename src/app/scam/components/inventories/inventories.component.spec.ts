import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoriesComponent } from './inventories.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';

describe('InventoriesComponent', () => {
  let component: InventoriesComponent;
  let fixture: ComponentFixture<InventoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InventoriesComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [MatTableModule, HttpClientTestingModule, MatDialogModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
