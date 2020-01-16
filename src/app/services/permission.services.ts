import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import 'rxjs/add/operator/toPromise';
import { PermissionModel } from "../models/permission.model";
import { AuthenticationService } from "./authentication.service";
import { SetMessageService } from "./set-message.service";

@Injectable()

export class PermissionServices {

    permissions: PermissionModel[] = new Array();
    baseUrl = '/permissionsDb';

    constructor(
      private message: SetMessageService,
      private http: HttpClient,
      private activeUser: AuthenticationService
    ) {}

    getAll(): Promise<any> {

      if (this.activeUser.isAdmin || this.activeUser.isPermitted['to_view_permissions']) {
        return this.http.get(this.baseUrl, { observe: "response"})
          .toPromise()
          .then(res => {
            this.permissions = res.body as PermissionModel[];
            return Promise.resolve('success');
          })
          .catch((error: any) => {
            this.message.set(error);
          })
      } else {
        this.message.set({ status: 403, statusText: 'Get All Permissions'});
      }

    }

    addRecord(form: PermissionModel): Promise<any> {

      if (this.activeUser.isAdmin || this.activeUser.isPermitted['to_add_permissions']) {
        return this.http.post(this.baseUrl, form, { observe : "response"})
          .toPromise()
          .then((response: any) => {
            this.message.set({status: response.status, statusText: 'Add Permissions'});
            this.getAll();
          })
          .catch((error: any) => {
            this.message.set(error);
          })
      } else {
        this.message.set({ status: 403, statusText: 'Add Permissions'});
      }

    }

    deleteRecord(permission_id: string): Promise<any> {

      if (this.activeUser.isAdmin || this.activeUser.isPermitted['to_delete_permissions']) {
        return this.http.delete(`${this.baseUrl}/${permission_id}`, {observe: "response"})
          .toPromise()
          .then((response: any) => {
            this.message.set({status: response.status, statusText: 'Delete Permissions'});
            this.getAll();
          })
          .catch((error: any) => {
            this.message.set(error);
          })
      } else {
        this.message.set({ status: 403, statusText: 'Delete Permissions'});
      }

    }

}
