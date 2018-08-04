import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import 'rxjs/add/operator/toPromise';
import { ErrorParser } from './errorParser';
import { PermissionModel } from "../models/permission.model";
import { HttpAuthService } from "./httpAuth.service";
import { Router } from "@angular/router";
import { AccountModel } from "../models/account.model";

@Injectable()

export class PermissionServices {

    errorParser = new ErrorParser();
    permissions: PermissionModel[] = new Array();
    baseUrl = '/permissionsDb';
    message: any = {};
    
    constructor(private http: HttpClient, private activeUser: HttpAuthService, private router: Router) {}

    getAll(): Promise<any> {
        if(!this.activeUser.isPermitted['to_view_permissions']){
            this.setMessage({ status: 405, message: 'insufficient permissions'});
        }

        else {
            return this.http.get(this.baseUrl, { observe: "response"})
                .toPromise()
                .then(res => {
                    this.permissions = res.body as PermissionModel[];

                    return Promise.resolve('success');
                })
                .catch(this.errorParser.handleError)
        }

    }

    getList(): Promise<any> {
        if(!this.activeUser.isPermitted['to_view_permissions']){
            this.setMessage({ status: 405, message: 'insufficient permissions'});
        }

        else {
            return Promise.reject({ status: '', message: 'method not yet defined'})
        }

    }

    getOne(): Promise<any> {
        if(!this.activeUser.isPermitted['to_view_permissions']){
            this.setMessage({ status: 405, message: 'insufficient permissions'});
        }

        else {
            return Promise.reject({ status: '', message: 'method not yet defined'})
        }

    }

    addItem(form: PermissionModel): Promise<any> {
        if(!this.activeUser.isPermitted['to_add_permissions']) {
            this.setMessage({ status: 405, message: 'insufficient permissions'});
        }

        else{
            return this.http.post(this.baseUrl, form, { observe : "response"})
                .toPromise()
                .then((response: any) => {
                    this.setMessage({status: response.status, message: response.body.message});
                    this.getAll();
                })
                .catch(this.errorParser.handleError)
                .catch((error: any) => {
                    this.setMessage(error);
                })
        }
    }

    deleteItem(permission_id: string): Promise<any> {

        if(!this.activeUser.isPermitted['to_delete_permissions']){
            this.setMessage({ status: 405, message: 'insufficient permissions'});
        }
        else {
            return this.http.delete(`${this.baseUrl}/${permission_id}`, {observe: "response"})
                .toPromise()
                .then((response: any) => {
                    this.setMessage({status: response.status, message: response.body.message});
                    this.getAll();
                })
                .catch(this.errorParser.handleError)
                .catch((error: any) => {
                    this.setMessage(error);
                })
        }
    }

    editItem(): Promise<any> {
        if(!this.activeUser.isPermitted['to_edit_permissions']){
            this.setMessage({ status: 405, message: 'insufficient permissions'});
        }
        else {
            return Promise.reject({ status: '', message: 'method not yet defined'})
        }
    }

    private setMessage(message ?: any) {
        message.status != 200 ? this.message.failure = message : this.message.success = message;

        setTimeout(() => {
            this.message.success = null;
            this.message.failure = null;
            if(message.forceLogout){
                this.activeUser.logout();
                this.router.navigate(['/login']);
            }
        },3000)
    }
    
}