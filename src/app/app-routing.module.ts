import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '../environments/environment';
import { LoginComponent } from './shared/login/login.component';
import { NgxPermissionsGuard } from 'ngx-permissions';


const routes: Routes = [
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule)
  },
  {
    path: 'applications',
    loadChildren: () => import('./applications/applications.module').then(m => m.ApplicationsModule)
  },
  {
    path: 'inventories',
    loadChildren: () => import('./inventories/inventories.module').then(m => m.InventoriesModule)
  },
  {
    path: 'jobs',
    loadChildren: () => import('./jobs/jobs.module').then(m => m.JobsModule)
  },
  {
    path: 'templates',
    loadChildren: () => import('./templates/templates.module').then(m => m.TemplatesModule)
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: ['GUEST'],
        redirectTo: '/deployments'
      }
    }
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: environment.enableRouterTracing})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
