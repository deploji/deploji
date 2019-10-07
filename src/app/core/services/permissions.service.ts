import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Permission } from '../interfaces/permission';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {
  constructor(private http: HttpClient) {
  }

  getTeamPermissions(teamId: number) {
    return this.http.get<Permission[]>(`/api/teams/${teamId}/permissions`);
  }

  getUserPermissions(userId: number) {
    return this.http.get<Permission[]>(`/api/users/${userId}/permissions`);
  }

  addPermission(value: Permission) {
    return this.http.post<any>(`/api/permissions`, value);
  }

  deletePermission(permission: Permission) {
    return this.http.post<any>(`/api/permissions/delete`, permission);
  }

  getPermissions(filters?: {[param: string]: string}) {
    return this.http.get<Permission[]>('/api/permissions', {params: filters});
  }
}
