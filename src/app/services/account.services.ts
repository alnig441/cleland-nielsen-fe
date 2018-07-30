import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import 'rxjs/add/operator/toPromise';
import { ErrorParser } from './errorParser';
import { AccountModel } from "../models/account.model";
import { HttpAuthService } from "./httpAuth.service";

@Injectable()

export class AccountServices {

    errorParser = new ErrorParser();
    accounts: AccountModel[] = new Array();
    baseUrl = '/accountsDb';
    error: any;

    constructor(private http: HttpClient, private activeUser: HttpAuthService ) {}

    getAll(): Promise<any> {
        if(!this.activeUser.isPermitted['to_view_accounts']){
            return Promise.reject({ status: 405, message: 'insufficient permissions'})
                .catch(this.errorParser.handleError);
        }

        else{
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

    getList(): Promise<any> {
        if(!this.activeUser.isPermitted['to_view_accounts']){
            return Promise.reject({ status: 405, message: 'insufficient permissions'})
                .catch(this.errorParser.handleError);
        }

        else {
            return Promise.reject({ status: '', message: 'method not yet defined'})
        }

    }

    getOne(): Promise<any> {
        if(!this.activeUser.isPermitted['to_view_accounts']){
            return Promise.reject({ status: 405, message: 'insufficient permissions'})
                .catch(this.errorParser.handleError);
        }

        else {
            return Promise.reject({ status: '', message: 'method not yet defined'})
        }

    }

    addItem(): Promise<any> {
        if(!this.activeUser.isPermitted['to_add_accounts']){
            return Promise.reject({ status: 405, message: 'insufficient permissions'})
                .catch(this.errorParser.handleError)
        }
        else {
            return Promise.reject({ status: '', message: 'method not yet defined'})
        }
    }

    deleteItem(): Promise<any> {
        if(!this.activeUser.isPermitted['to_delete_accounts']){
            return Promise.reject({ status: 405, message: 'insufficient permissions'})
                .catch(this.errorParser.handleError)
        }
        else {
            return Promise.reject({ status: '', message: 'method not yet defined'})
        }
    }

    editItem(): Promise<any> {
        if(!this.activeUser.isPermitted['to_edit_accounts']){
            return Promise.reject({ status: 405, message: 'insufficient permissions'})
                .catch(this.errorParser.handleError)
        }
        else {
            return Promise.reject({ status: '', message: 'method not yet defined'})
        }
    }

}