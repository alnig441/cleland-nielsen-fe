import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import 'rxjs/add/operator/toPromise';
import { UserModel } from "../models/user.model";
import { AuthenticationService } from "./authentication.service";
import { SetMessageService } from "./set-message.service";

@Injectable()

export class UserServices {

    users: UserModel[] = new Array();
    baseUrl = '/usersDb';

    constructor(
      private message: SetMessageService,
      private http: HttpClient,
      private activeUser: AuthenticationService,
    ) {}

    getAll(): Promise<any> {

      if (this.activeUser.isAdmin || this.activeUser.isPermitted['to_view_users']) {
        return this.http.get(this.baseUrl, { observe: "response"})
          .toPromise()
          .then( result => {
            this.users = result.body as UserModel[];
            return Promise.resolve('success');
          })
          .catch((error: any) => {
            this.message.set(error);
          })
      } else {
        this.message.set({ status: 403, message: 'Get Users'});
      }

    }

    addRecord(form: UserModel): Promise<any> {

      if (this.activeUser.isAdmin || this.activeUser.isPermitted['to_add_users']) {
        return this.http.post(this.baseUrl, form, { observe : "response"})
          .toPromise()
          .then((result: any) => {
            this.message.set({ status: result.status , statusText : 'Add Users' });
            this.getAll();
          })
          .catch((error: any) => {
            this.message.set(error);
          })
      } else {
        this.message.set({ status: 403, statusText: 'Add Users'});
      }

    }

    deleteRecord(permission_id: string): Promise<any> {

      if (this.activeUser.isAdmin || this.activeUser.isPermitted['to_delete_users']) {
        return this.http.delete(`${this.baseUrl}/${permission_id}`, {observe: "response"})
          .toPromise()
          .then((response: any) => {
            this.message.set({ status: response.status , statusText: 'Delete Users' });
            this.getAll();
          })
          .catch((error: any) => {
            this.message.set(error);
          })
      } else {
        this.message.set({ status: 403, statusText: 'Delete Users'});
      }

    }

    editRecord(user: UserModel): Promise<any> {
    
      if (this.activeUser.isAdmin || this.activeUser.isPermitted['to_edit_users']) {
        return this.http.put(`${this.baseUrl}/${user.user_id}`, user, { observe: "response"})
          .toPromise()
          .then((response: any) => {
            this.message.set({ status: response.status , statusText: 'Update Users' })
            this.getAll();
          })
          .catch((error: any) => {
            this.message.set(error);
          })
      } else {
        this.message.set({ status: 403, statusText: 'Update Users'});
      }

    }
}
