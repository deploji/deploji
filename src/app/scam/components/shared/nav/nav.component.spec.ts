import { LayoutModule } from '@angular/cdk/layout';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { NavComponent } from './nav.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NgxPermissionsModule } from 'ngx-permissions';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatMenuModule } from '@angular/material/menu';
import { NavService } from '../../../../core/services/nav.service';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  const navServiceMock = new NavService();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NavComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        NoopAnimationsModule,
        LayoutModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatSidenavModule,
        MatToolbarModule,
        NgxPermissionsModule.forRoot(),
        MatMenuModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [{ provide: NavService, useValue: navServiceMock }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });

  it('should close the side navigation', () => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    navServiceMock.setNav({ title: 'Menu', items: []});
    fixture.detectChanges();
    expect(component.opened).toBe(false);
  });

  it('should open the side navigation', () => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    navServiceMock.setNav({ title: 'Settings', items: [{label: 'SSH Keys', link: '/settings/keys'}]});
    fixture.detectChanges();
    expect(component.opened).toBe(true);
  });
});
