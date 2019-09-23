import { Component, Input, NgModule, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { Permission } from '../../../../core/interfaces/permission';
import { TeamsService } from '../../../../core/services/teams.service';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormInventoryComponentModule } from '../form/form-inventory/form-inventory.component';
import { FormSshKeyComponentModule } from '../form/form-ssh-key/form-ssh-key.component';
import { FormApplicationComponentModule } from '../form/form-application/form-application.component';
import { FormRoleComponentModule } from '../form/form-action-type/form-action-type.component';
import { FormTemplateComponentModule } from '../form/form-template/form-template.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PermissionForm } from '../../../../core/forms/permission.form';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ObjectTypesEnum } from '../../../../core/enums/object-types.enum';
import { mergeMap } from 'rxjs/operators';
import { PermissionsService } from '../../../../core/services/permissions.service';
import { SubjectTypesEnum } from '../../../../core/enums/subject-types.enum';
import { FormUserComponentModule } from '../form/form-user/form-user.component';
import { FormTeamComponentModule } from '../form/form-team/form-team.component';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-manage-permissions',
  templateUrl: './manage-permissions.component.html',
  styleUrls: ['./manage-permissions.component.scss']
})
export class ManagePermissionsComponent implements OnChanges {
  @Input() editable = true;
  @Input() teamId: number;
  @Input() userId: number;
  @Input() templateId: number;
  @Input() inventoryId: number;
  @Input() appId: number;
  @Input() keyId: number;
  permissions: Permission[] = [];
  form = new PermissionForm();
  columnsToDisplay = ['object-type', 'object-name', 'subject-type', 'subject-name', 'action', 'actions'];
  showAddDialog = false;
  ObjectTypesEnum = ObjectTypesEnum;
  objectTypes = [
    ObjectTypesEnum.APPLICATION,
    ObjectTypesEnum.INVENTORY,
    ObjectTypesEnum.KEY,
    ObjectTypesEnum.TEMPLATES,
  ];
  SubjectTypesEnum = SubjectTypesEnum;
  subjectTypes = [
    SubjectTypesEnum.USERS,
    SubjectTypesEnum.TEAMS,
  ];
  private permissions$: Observable<Permission[]> = of([]);

  constructor(private teamsService: TeamsService, private permissionsService: PermissionsService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.teamId && changes.teamId.currentValue) {
      this.form.SubjectType.setValue(SubjectTypesEnum.TEAMS);
      this.form.Subject.setValue({ID: changes.teamId.currentValue});
      this.columnsToDisplay = ['object-type', 'object-name', 'action', 'actions'];
      this.permissions$ = this.permissionsService.getTeamPermissions(changes.teamId.currentValue);
    }
    if (changes.userId && changes.userId.currentValue) {
      this.form.SubjectType.setValue(SubjectTypesEnum.USERS);
      this.form.Subject.setValue({ID: changes.userId.currentValue});
      this.columnsToDisplay = ['object-type', 'object-name', 'action', 'actions'];
      this.permissions$ = this.permissionsService.getUserPermissions(changes.userId.currentValue);
    }
    if (changes.inventoryId && changes.inventoryId.currentValue) {
      this.initializeObjectValues(ObjectTypesEnum.INVENTORY, changes.inventoryId.currentValue);
    }
    if (changes.appId && changes.appId.currentValue) {
      this.initializeObjectValues(ObjectTypesEnum.APPLICATION, changes.appId.currentValue);
    }
    if (changes.keyId && changes.keyId.currentValue) {
      this.initializeObjectValues(ObjectTypesEnum.KEY, changes.keyId.currentValue);
    }
    if (changes.templateId && changes.templateId.currentValue) {
      this.initializeObjectValues(ObjectTypesEnum.TEMPLATES, changes.templateId.currentValue);
    }
    this.permissions$.subscribe(permissions => {
      this.permissions = permissions;
    });
  }

  private initializeObjectValues(type: ObjectTypesEnum, id: any) {
    this.form.ObjectType.setValue(type);
    this.form.Object.setValue({ID: id});
    this.columnsToDisplay = ['subject-type', 'subject-name', 'action', 'actions'];
    this.permissions$ = this.permissionsService.getPermissions({
      ObjectType: type,
      ObjectID: id
    });
  }

  toggleDialog() {
    this.showAddDialog = !this.showAddDialog;
  }

  addPermission() {
    this.form.markAsTouched();
    if (!this.form.valid) {
      return;
    }
    const value = this.form.getValue();
    this.permissionsService.addPermission(value).pipe(
      mergeMap(() => {
        return this.permissions$;
      })
    ).subscribe((permissions) => {
      this.permissions = permissions;
    });
  }

  delete(permission: Permission) {
    this.permissionsService.deletePermission(permission).pipe(
      mergeMap(() => {
        return this.permissions$;
      })
    ).subscribe((permissions) => {
      this.permissions = permissions;
    });
  }
}

@NgModule({
  declarations: [ManagePermissionsComponent],
  exports: [ManagePermissionsComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    FormInventoryComponentModule,
    FormSshKeyComponentModule,
    FormApplicationComponentModule,
    FormRoleComponentModule,
    FormTemplateComponentModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    FormUserComponentModule,
    FormTeamComponentModule,
  ]
})
export class ManagePermissionsComponentModule {
}
