import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import 'rxjs/add/operator/toPromise';
import { ErrorParser } from './error-parser';
import { PermissionModel } from "../models/permission.model";
import { HttpAuthService } from "./http-authentication.service";
import { SetMessageService } from "./set-message.service";

@Injectable()

export class PermissionServices {

    errorParser = new ErrorParser();
    permissions: PermissionModel[] = new Array();
    baseUrl = '/permissionsDb';
    
    constructor(private message: SetMessageService, private http: HttpClient, private activeUser: HttpAuthService) {}

    getAll(): Promise<any> {
        if(!this.activeUser.isPermitted['to_view_permissions']){
            this.message.set({ status: 405, message: 'insufficient permissions'});
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
            this.message.set({ status: 405, message: 'insufficient permissions'});
        }

        return Promise.reject({ status: '', message: 'method not yet defined'})
            .catch((result: any) => {
                this.message.set(result);
            })


    }

    getOne(): Promise<any> {
        if(!this.activeUser.isPermitted['to_view_permissions']){
            this.message.set({ status: 405, message: 'insufficient permissions'});
        }

        else {
            return Promise.reject({ status: '', message: 'method not yet defined'})
        }

    }

    addRecord(form: PermissionModel): Promise<any> {
        if(!this.activeUser.isPermitted['to_add_permissions']) {
            this.message.set({ status: 405, message: 'insufficient permissions'});
        }

        else{
            return this.http.post(this.baseUrl, form, { observe : "response"})
                .toPromise()
                .then((response: any) => {
                    this.message.set({status: response.status, message: response.body.message});
                    this.getAll();
                })
                .catch(this.errorParser.handleError)
                .catch((error: any) => {
                    this.message.set(error);
                })
        }
    }

    deleteRecord(permission_id: string): Promise<any> {

        if(!this.activeUser.isPermitted['to_delete_permissions']){
            this.message.set({ status: 405, message: 'insufficient permissions'});
        }
        else {
            return this.http.delete(`${this.baseUrl}/${permission_id}`, {observe: "response"})
                .toPromise()
                .then((response: any) => {
                    this.message.set({status: response.status, message: response.body.message});
                    this.getAll();
                })
                .catch(this.errorParser.handleError)
                .catch((error: any) => {
                    this.message.set(error);
                })
        }
    }

    editRecord(): Promise<any> {
        if(!this.activeUser.isPermitted['to_edit_permissions']){
            this.message.set({ status: 405, message: 'insufficient permissions'});
        }
        else {
            return Promise.reject({ status: '', message: 'method not yet defined'})
        }
    }
}