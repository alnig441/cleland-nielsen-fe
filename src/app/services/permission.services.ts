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
    error: any;
    information: any;

    constructor(private http: HttpClient, private activeUser: HttpAuthService, private router: Router) {}

    getAll(): Promise<any> {
        if(!this.activeUser.isPermitted['to_view_permissions']){
            this.isNotPermitted();
        }

        else {
            return this.http.get(this.baseUrl, { observe: "response"})
                .toPromise()
                .then(res => {
                    // console.log('show me permissions: ', res.body)
                    this.permissions = res.body as PermissionModel[];

                    return Promise.resolve('success');
                })
                .catch(this.errorParser.handleError)
        }

    }

    getList(): Promise<any> {
        if(!this.activeUser.isPermitted['to_view_permissions']){
            this.isNotPermitted()
        }

        else {
            return Promise.reject({ status: '', message: 'method not yet defined'})
        }

    }

    getOne(): Promise<any> {
        if(!this.activeUser.isPermitted['to_view_permissions']){
            this.isNotPermitted()
        }

        else {
            return Promise.reject({ status: '', message: 'method not yet defined'})
        }

    }

    addItem(form: PermissionModel): Promise<any> {
        if(!this.activeUser.isPermitted['to_add_permissions']) {
            this.isNotPermitted();
        }

        else{
            return this.http.post(this.baseUrl, form, { observe : "response"})
                .toPromise()
                .then((result: any) => {
                    this.information = { status: result.status , message : result.body.message }
                    this.getAll();
                    this.clearRegisters();
                })
                .catch(this.errorParser.handleError)
                .catch((error: any) => {
                    this.error = error;
                    this.clearRegisters();
                    if(error.forceLogout){
                        setTimeout(() => {
                            this.activeUser.logout();
                            this.router.navigate(["/login"]);
                        }, 3000)
                    }
                })
        }
    }

    deleteItem(permission_id: string): Promise<any> {

        if(!this.activeUser.isPermitted['to_delete_permissions']){
            this.isNotPermitted();
        }
        else {
            return this.http.delete(`${this.baseUrl}/${permission_id}`, {observe: "response"})
                .toPromise()
                .then((response: any) => {
                    this.information = { status: response.status , message: response.body.message };
                    this.getAll();
                    this.clearRegisters();
                })
                .catch(this.errorParser.handleError)
                .catch((error: any) => {
                    this.error = error;
                    this.clearRegisters();
                    if(error.forceLogout){
                        setTimeout(() => {
                            this.activeUser.logout();
                            this.router.navigate(["/login"]);
                        }, 3000)
                    }
                })
        }
    }

    editItem(): Promise<any> {
        if(!this.activeUser.isPermitted['to_edit_permissions']){
            this.isNotPermitted()
        }
        else {
            return Promise.reject({ status: '', message: 'method not yet defined'})
        }
    }

    private clearRegisters(status?: any) {
        setTimeout(() => {
            this.information = null;
            this.error = null;
        },3000)
    }

    private isNotPermitted(): Promise<any> {
        return Promise.reject({ status: 405, message: 'insufficient permissions'})
            .catch(this.errorParser.handleError)
            .catch((error: any) => {
                this.error = error;
                this.clearRegisters();
            })
    }

}