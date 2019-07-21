import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { NavResolve } from '../core/resolvers/nav.resolver';
import { ProjectsComponent } from './projects/projects.component';
import { KeysComponent } from './keys/keys.component';
import { AddSshKeyComponent } from './add-ssh-key/add-ssh-key.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { AppsComponent } from './apps/apps.component';
import { EditAppComponent } from './edit-app/edit-app.component';
import { InventoriesComponent } from './inventories/inventories.component';
import { EditInventoryComponent } from './edit-inventory/edit-inventory.component';
import { EditRepositoryComponent } from './edit-repository/edit-repository.component';
import { RepositoriesComponent } from './repositories/repositories.component';
import { TemplatesComponent } from './templates/templates.component';

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
          },
          {
            label: 'Inventories',
            link: '/settings/inventories'
          },
          {
            label: 'Repositories',
            link: '/settings/repositories'
          },
          {
            label: 'Applications',
            link: '/settings/apps'
          },
          {
            label: 'Templates',
            link: '/settings/templates'
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
        path: 'projects/create',
        component: EditProjectComponent
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
        path: 'keys/add',
        component: AddSshKeyComponent
      },
      {
        path: 'inventories',
        component: InventoriesComponent
      },
      {
        path: 'inventories/create',
        component: EditInventoryComponent
      },
      {
        path: 'inventories/:id',
        component: EditInventoryComponent
      },
      {
        path: 'apps',
        component: AppsComponent
      },
      {
        path: 'apps/create',
        component: EditAppComponent
      },
      {
        path: 'apps/:id',
        component: EditAppComponent
      },
      {
        path: 'repositories',
        component: RepositoriesComponent
      },
      {
        path: 'repositories/create',
        component: EditRepositoryComponent
      },
      {
        path: 'repositories/:id',
        component: EditRepositoryComponent
      },
      {
        path: 'templates',
        component: TemplatesComponent
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
