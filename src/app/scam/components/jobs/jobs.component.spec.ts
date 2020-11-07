import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsComponent } from './jobs.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { JobTypePipeModule } from '../../pipes/job-type.pipe';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RxStompServiceTestingModule } from '../../../testing/rx-stomp-service.mock';
import { ServiceWorkerModule, SwPush } from '@angular/service-worker';
import { environment } from '../../../../environments/environment';
import { ConfigService } from '../../../core/services/config.service';

describe('JobsComponent', () => {
  let component: JobsComponent;
  let fixture: ComponentFixture<JobsComponent>;
  const configSpy = jasmine.createSpyObj<ConfigService>('ConfigSpy', ['getSettings']);
  configSpy.getSettings.and.returnValue({});
  const swSpy = jasmine.createSpyObj<SwPush>('swPush', ['requestSubscription']);
  swSpy.requestSubscription.and.returnValue(Promise.resolve({} as PushSubscription));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JobsComponent],
      imports: [
        MatTableModule,
        JobTypePipeModule,
        RouterTestingModule,
        HttpClientTestingModule,
        RxStompServiceTestingModule,
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
      ],
      providers: [
        {provide: ConfigService, useValue: configSpy},
        {provide: SwPush, useValue: swSpy}
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
