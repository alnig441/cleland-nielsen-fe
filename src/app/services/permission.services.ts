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

    constructor(private http: HttpClient, private activeUser: HttpAuthService) {}

    getAll(): Promise<any> {
        if(!this.activeUser.isPermitted['to_view_permissions']){

            console.log('permission serv - user not allowed')

            return Promise.reject({ status: 405, message: 'insufficient permissions'})
                .catch(this.errorParser.handleError);
        }

        else {
            return this.http.get(this.baseUrl, { observe: "response"})
                .toPromise()
                .then(res => {
                    this.permissions = res.body as PermissionModel[];
                })
                .catch(this.errorParser.handleError)
        }

    }

    getLatest(): Promise<any> {
        if(!this.activeUser.isPermitted['to_view_permissions']){
            return Promise.reject({ status: 405, message: 'insufficient permissions'})
                .catch(this.errorParser.handleError);
        }

        else {
            return this.http.get(this.baseUrl, {observe: "response"})
                .toPromise()
                .then(res => {
                    let error = { message: 'function yet to be defined'}
                    throw error;
                })
        }

    }

    getList(): Promise<any> {
        if(!this.activeUser.isPermitted['to_view_permissions']){
            return Promise.reject({ status: 405, message: 'insufficient permissions'})
                .catch(this.errorParser.handleError);
        }

        else {
            return this.http.get(this.baseUrl, { observe: "response"})
                .toPromise()
                .then(res => {
                    let error = { message: 'function yet to be defined'}
                    throw error;
                })
        }

    }

    getOne(): Promise<any> {
        if(!this.activeUser.isPermitted['to_view_permissions']){
            return Promise.reject({ status: 405, message: 'insufficient permissions'})
                .catch(this.errorParser.handleError);
        }

        else {
            return this.http.get(this.baseUrl, { observe: "response"})
                .toPromise()
                .then(res => {
                    let error = { message: 'function yet to be defined'}
                    throw error;
                })
        }

    }
}