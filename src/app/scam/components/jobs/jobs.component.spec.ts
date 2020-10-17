// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
//
// import { JobsComponent } from './jobs.component';
// import { NO_ERRORS_SCHEMA } from '@angular/core';
// import { MatTableModule } from '@angular/material/table';
// import { JobTypePipeModule } from '../../pipes/job-type.pipe';
// import { RouterTestingModule } from '@angular/router/testing';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { RxStompServiceTestingModule } from '../../../testing/rx-stomp-service.mock';
// import { ServiceWorkerModule } from '@angular/service-worker';
// import { environment } from '../../../../environments/environment';
//
// describe('JobsComponent', () => {
//   let component: JobsComponent;
//   let fixture: ComponentFixture<JobsComponent>;
//
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [JobsComponent],
//       imports: [
//         MatTableModule,
//         JobTypePipeModule,
//         RouterTestingModule,
//         HttpClientTestingModule,
//         RxStompServiceTestingModule,
//         ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
//       ],
//       schemas: [NO_ERRORS_SCHEMA],
//     })
//       .compileComponents();
//   }));
//
//   beforeEach(() => {
//     fixture = TestBed.createComponent(JobsComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
//
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
