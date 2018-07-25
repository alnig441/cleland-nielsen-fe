import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import 'rxjs/add/operator/toPromise';
import { ErrorParser } from './errorParser';
import { AccountModel } from "../models/account.model";

@Injectable()

export class AccountServices {

    errorParser = new ErrorParser();
    accounts: AccountModel[] = new Array();
    baseUrl = '/accountsDb';
    error: any;

    constructor(private http: HttpClient) {}

    getAll(): Promise<any> {
        return this.http.get(this.baseUrl, { observe: "response"})
            .toPromise()
            .then( (result : any) => {
                this.accounts = result.body as AccountModel[];
            })
            .catch(this.errorParser.handleError)
            .catch( (error : any) => {
                this.error = error;
            })
    }
}