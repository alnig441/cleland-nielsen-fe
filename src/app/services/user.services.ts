
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import 'rxjs/add/operator/toPromise';
import { ErrorParser } from './errorParser';
import { UserModel } from "../models/user.model";
import { HttpAuthService } from "./httpAuth.service";

@Injectable()

export class UserServices {

    errorParser = new ErrorParser();
    users: UserModel[] = new Array();
    baseUrl = '/usersDb';
    error: any;

    constructor(private http: HttpClient, private activeUser: HttpAuthService) {}

    getOne(): Promise<any> {
        if(!this.activeUser.isPermitted['to_view_users']){
            return Promise.reject({ status: 405, message: 'insufficient permissions'})
                .catch(this.errorParser.handleError);
        }

        else{
            return this.http.get(this.baseUrl, { observe: "response"})
                .toPromise()
                .then()
                .catch(this.errorParser.handleError)
        }

    }

    getLatest(): Promise<any> {
        if(!this.activeUser.isPermitted['to_view_users']){
            return Promise.reject({ status: 405, message: 'insufficient permissions'})
                .catch(this.errorParser.handleError);
        }

        else{
            return this.http.get(this.baseUrl, { observe: "response"})
                .toPromise()
                .then()
                .catch(this.errorParser.handleError)
        }

    }

    getList(): Promise<any> {
        if(!this.activeUser.isPermitted['to_view_users']){
            return Promise.reject({ status: 405, message: 'insufficient permissions'})
                .catch(this.errorParser.handleError);
        }

        else {
            return this.http.get(this.baseUrl, { observe: "response" })
                .toPromise()
                .then()
                .catch(this.errorParser.handleError)
        }

    }

    getAll(): Promise<any> {
        if(!this.activeUser.isPermitted['to_view_users']){
            return Promise.reject({ status: 405, message: 'insufficient permissions'})
                .catch(this.errorParser.handleError);
        }

        else {
            return this.http.get(this.baseUrl, { observe: "response"})
                .toPromise()
                .then( result => {
                    this.users = result.body as UserModel[];
                })
                .catch(this.errorParser.handleError)
        }

    }
}