import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SettingsComponent} from './settings.component';
import {NavResolve} from '../core/resolvers/nav.resolver';
import {ProjectsComponent} from './projects/projects.component';
import {KeysComponent} from './keys/keys.component';
import {AddSshKeyComponent} from './add-ssh-key/add-ssh-key.component';
import {EditProjectComponent} from './edit-project/edit-project.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    resolve: [NavResolve],
    data: {
      nav: {
        title: 'Settings',
        items: [
          {
            label: 'SSH keys',
            link: '/settings/keys'
          },
          {
            label: 'Projects',
            link: '/settings/projects'
          }
        ]
      }
    },
    children: [
      {
        path: 'projects',
        component: ProjectsComponent
      },
      {
        path: 'projects/:id',
        component: EditProjectComponent
      },
      {
        path: 'keys',
        component: KeysComponent
      },
      {
        path: 'add-ssh-key',
        component: AddSshKeyComponent
      },
      {
        path: 'create-project',
        component: EditProjectComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule {
}
