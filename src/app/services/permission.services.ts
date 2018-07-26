import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import 'rxjs/add/operator/toPromise';
import { ErrorParser } from './errorParser';
import { PermissionModel } from "../models/permission.model";

@Injectable()

export class PermissionServices {

    errorParser = new ErrorParser();
    permissions: PermissionModel[] = new Array();
    baseUrl = '/permissionsDb';
    error: any;

    constructor(private http: HttpClient) {}

    getAll(): Promise<any> {
        return this.http.get(this.baseUrl, { observe: "response"})
            .toPromise()
            .then(res => {
                // let error = { message: 'function yet to be defined'}
                // throw error;
                this.permissions = res.body as PermissionModel[];
            })
            .catch(this.errorParser.handleError)
    }

    getLatest(): Promise<any> {
        return this.http.get(this.baseUrl, {observe: "response"})
            .toPromise()
            .then(res => {
                let error = { message: 'function yet to be defined'}
                throw error;
            })
    }

    getList(): Promise<any> {

        return this.http.get(this.baseUrl, { observe: "response"})
            .toPromise()
            .then(res => {
                let error = { message: 'function yet to be defined'}
                throw error;
            })
    }

    getOne(): Promise<any> {

        return this.http.get(this.baseUrl, { observe: "response"})
            .toPromise()
            .then(res => {
                let error = { message: 'function yet to be defined'}
                throw error;
            })
    }
}