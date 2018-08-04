import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import 'rxjs/add/operator/toPromise';
import { ErrorParser } from './errorParser';
import { AccountModel } from "../models/account.model";
import { HttpAuthService } from "./httpAuth.service";
import { Router } from "@angular/router";

@Injectable()

export class AccountServices {

    errorParser = new ErrorParser();
    accounts: AccountModel[] = new Array();
    baseUrl = '/accountsDb';
    message: any = {};

    constructor(private http: HttpClient, private activeUser: HttpAuthService, private router: Router) {}

    getAll(): Promise<any> {
        if(!this.activeUser.isPermitted['to_view_accounts']){
            this.setMessage({ status: 405, message: 'insufficient permissions'});
        }

        else{
            return this.http.get(this.baseUrl, { observe: "response"})
                .toPromise()
                .then( (result : any) => {
                    this.accounts = result.body as AccountModel[];

                    return Promise.resolve('success');
                })
                .catch(this.errorParser.handleError)
                .catch( (error : any) => {
                    this.setMessage(error)
                })
        }

    }

    getList(): Promise<any> {
        if(!this.activeUser.isPermitted['to_view_accounts']){
            this.setMessage({ status: 405, message: 'insufficient permissions'});
        }

        else {
            return Promise.reject({ status: '', message: 'method not yet defined'})
        }

    }

    getOne(): Promise<any> {
        if(!this.activeUser.isPermitted['to_view_accounts']){
            this.setMessage({ status: 405, message: 'insufficient permissions'});
        }

        else {
            return Promise.reject({ status: '', message: 'method not yet defined'})
        }

    }

    addItem(form: AccountModel): Promise<any> {
        if(!this.activeUser.isPermitted['to_add_accounts']) {
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

    deleteItem(account_id: string): Promise<any> {

        if(!this.activeUser.isPermitted['to_delete_accounts']){
            this.setMessage({ status: 405, message: 'insufficient permissions'});
        }
        else {
            return this.http.delete(`${this.baseUrl}/${account_id}`, {observe: "response"})
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

    editItem(account: AccountModel): Promise<any> {
        if(!this.activeUser.isPermitted['to_edit_accounts']){
            this.setMessage({ status: 405, message: 'insufficient permissions'});
        }
        else {
            return this.http.put(`${this.baseUrl}/${account.account_id}`, account.account_permissions, {observe: "response"})
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