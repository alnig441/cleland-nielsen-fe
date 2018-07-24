import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import 'rxjs/add/operator/toPromise';
import { ErrorParser } from './errorParser';
import { UserModel } from "../models/user.model";

@Injectable()

export class UsersServices {

    errorParser = new ErrorParser();
    users: UserModel[] = new Array();
    baseUrl = '/usersDb';
    error: any;

    constructor(private http: HttpClient) {}

    getOne(): Promise<any> {
        return this.http.get(this.baseUrl, { observe: "response"})
            .toPromise()
    }

    getLatest(): Promise<any> {
        return this.http.get(this.baseUrl, { observe: "response"})
            .toPromise()
    }

    getList(): Promise<any> {
        return this.http.get(this.baseUrl, { observe: "response" })
            .toPromise()
    }

    getAll(): Promise<any> {
        return this.http.get(this.baseUrl, { observe: "response"})
            .toPromise()
            .then( result => {
                this.users = result.body as UserModel[];
            })
            .catch(this.errorParser.handleError)
    }
}