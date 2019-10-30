import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent, SettingsComponentModule } from '../../scam/components/settings/settings.component';
import { NavResolve } from '../../core/resolvers/nav.resolver';
import { ProjectsComponent, ProjectsComponentModule } from '../../scam/components/settings/projects/projects.component';
import { KeysComponent, KeysComponentModule } from '../../scam/components/settings/keys/keys.component';
import {
  EditSshKeyComponent,
  EditSshKeyComponentModule
} from '../../scam/components/settings/edit-ssh-key/edit-ssh-key.component';
import {
  EditProjectComponent,
  EditProjectComponentModule
} from '../../scam/components/settings/edit-project/edit-project.component';
import { AppsComponent, AppsComponentModule } from '../../scam/components/settings/apps/apps.component';
import { EditAppComponent, EditAppComponentModule } from '../../scam/components/settings/edit-app/edit-app.component';
import {
  InventoriesComponent,
  InventoriesComponentModule
} from '../../scam/components/settings/inventories/inventories.component';
import {
  EditInventoryComponent,
  EditInventoryComponentModule
} from '../../scam/components/settings/edit-inventory/edit-inventory.component';
import {
  EditRepositoryComponent,
  EditRepositoryComponentModule
} from '../../scam/components/settings/edit-repository/edit-repository.component';
import {
  RepositoriesComponent,
  RepositoriesComponentModule
} from '../../scam/components/settings/repositories/repositories.component';
import {
  TemplatesComponent,
  TemplatesComponentModule
} from '../../scam/components/settings/templates/templates.component';
import {
  EditTemplateComponent,
  EditTemplateComponentModule
} from '../../scam/components/settings/edit-template/edit-template.component';
import {
  SystemSettingsComponent,
  SystemSettingsComponentModule
} from '../../scam/components/settings/system-settings/system-settings.component';
import { UsersComponent, UsersComponentModule } from '../../scam/components/settings/users/users.component';
import {
  EditUserComponent,
  EditUserComponentModule
} from '../../scam/components/settings/edit-user/edit-user.component';
import { TeamsComponent, TeamsComponentModule } from '../../scam/components/settings/teams/teams.component';
import {
  EditTeamComponent,
  EditTeamComponentModule
} from '../../scam/components/settings/edit-team/edit-team.component';
import {
  NotificationChannelsComponent,
  NotificationChannelsComponentModule
} from '../../scam/components/settings/notification-channels/notification-channels.component';
import {
  EditNotificationChannelComponent,
  EditNotificationChannelComponentModule
} from '../../scam/components/settings/edit-notification-channel/edit-notification-channel.component';

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
            label: 'Artifact Repositories',
            link: '/settings/repositories'
          },
          {
            label: 'Applications',
            link: '/settings/apps'
          },
          {
            label: 'Templates',
            link: '/settings/templates'
          },
          {
            label: 'Users',
            link: '/settings/users'
          },
          {
            label: 'Teams',
            link: '/settings/teams'
          },
          {
            label: 'Settings',
            link: '/settings/settings'
          },
          {
            label: 'Notification Channels',
            link: '/settings/notification-channels'
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
        path: 'keys/:id',
        component: EditSshKeyComponent
      },
      {
        path: 'keys/add',
        component: EditSshKeyComponent
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
      },
      {
        path: 'templates/create',
        component: EditTemplateComponent
      },
      {
        path: 'templates/:id',
        component: EditTemplateComponent
      },
      {
        path: 'users',
        component: UsersComponent
      },
      {
        path: 'users/create',
        component: EditUserComponent
      },
      {
        path: 'users/:id',
        component: EditUserComponent
      },
      {
        path: 'teams',
        component: TeamsComponent
      },
      {
        path: 'teams/create',
        component: EditTeamComponent
      },
      {
        path: 'teams/:id',
        component: EditTeamComponent
      },
      {
        path: 'settings',
        component: SystemSettingsComponent
      },
      {
        path: 'notification-channels',
        component: NotificationChannelsComponent
      },
      {
        path: 'notification-channel/create',
        component: EditNotificationChannelComponent
      },
      {
        path: 'notification-channel/:id',
        component: EditNotificationChannelComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    SettingsComponentModule,
    ProjectsComponentModule,
    EditProjectComponentModule,
    KeysComponentModule,
    EditSshKeyComponentModule,
    InventoriesComponentModule,
    EditInventoryComponentModule,
    AppsComponentModule,
    EditAppComponentModule,
    RepositoriesComponentModule,
    EditRepositoryComponentModule,
    TemplatesComponentModule,
    EditTemplateComponentModule,
    UsersComponentModule,
    TeamsComponentModule,
    EditTeamComponentModule,
    EditUserComponentModule,
    SystemSettingsComponentModule,
    NotificationChannelsComponentModule,
    EditNotificationChannelComponentModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class SettingsRoutingModule {
}
