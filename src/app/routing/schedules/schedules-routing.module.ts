import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavResolve } from '../../core/resolvers/nav.resolver';
import { SchedulesComponent, SchedulesComponentModule } from '../../scam/components/schedules/schedules.component';
import {
  SchedulerComponent,
  SchedulerComponentModule
} from '../../scam/components/settings/scheduler/scheduler.component';

const routes: Routes = [
  {
    path: '',
    component: SchedulesComponent,
    resolve: [NavResolve],
    data: {
      nav: {
        title: 'Schedules',
        items: []
      }
    }
  },
  {
    path: ':id',
    component: SchedulerComponent
  }
];

@NgModule({
  imports: [
    SchedulesComponentModule,
    SchedulerComponentModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class SchedulesRoutingModule {
}
