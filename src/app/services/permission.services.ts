import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import 'rxjs/add/operator/toPromise';
import { ErrorParser } from './errorParser';
import { PermissionModel } from "../models/permission.model";
import { HttpAuthService } from "./httpAuth.service";

@Injectable()

export class PermissionServices {

    errorParser = new ErrorParser();
    permissions: PermissionModel[] = new Array();
    baseUrl = '/permissionsDb';
    error: any;
    information: any;

    constructor(private http: HttpClient, private activeUser: HttpAuthService) {}

    getAll(): Promise<any> {
        if(!this.activeUser.isPermitted['to_view_permissions']){
            return Promise.reject({ status: 405, message: 'insufficient permissions'})
                .catch(this.errorParser.handleError);
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
            return Promise.reject({ status: 405, message: 'insufficient permissions'})
                .catch(this.errorParser.handleError);
        }

        else {
            return Promise.reject({ status: '', message: 'method not yet defined'})
        }

    }

    getOne(): Promise<any> {
        if(!this.activeUser.isPermitted['to_view_permissions']){
            return Promise.reject({ status: 405, message: 'insufficient permissions'})
                .catch(this.errorParser.handleError);
        }

        else {
            return Promise.reject({ status: '', message: 'method not yet defined'})
        }

    }

    addItem(form: PermissionModel): Promise<any> {
        if(!this.activeUser.isPermitted['to_add_permissions']) {
            return Promise.reject({ status : 405 , message : 'insufficient permissions'})
        }

        else{
            return this.http.post(this.baseUrl, form, { observe : "response"})
                .toPromise()
                .then((result: any) => {
                    this.information = { status: result.status , message : result.body.message }
                    this.getAll();
                })
                .catch(this.errorParser.handleError)
        }
    }

    deleteItem(): Promise<any> {
        if(!this.activeUser.isPermitted['to_delete_permissions']){
            return Promise.reject({ status: 405, message: 'insufficient permissions'})
                .catch(this.errorParser.handleError)
        }
        else {
            return Promise.reject({ status: '', message: 'method not yet defined'})
        }
    }

    editItem(): Promise<any> {
        if(!this.activeUser.isPermitted['to_edit_permissions']){
            return Promise.reject({ status: 405, message: 'insufficient permissions'})
                .catch(this.errorParser.handleError)
        }
        else {
            return Promise.reject({ status: '', message: 'method not yet defined'})
        }
    }

}