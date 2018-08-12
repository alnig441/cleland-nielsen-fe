import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import 'rxjs/add/operator/toPromise';
import { ErrorParser } from './error-parser';
import { AccountModel } from "../models/account.model";
import { AuthenticationService } from "./authentication.service";
import { SetMessageService } from "./set-message.service";

@Injectable()

export class AccountServices {

    errorParser = new ErrorParser();
    accounts: AccountModel[] = new Array();
    baseUrl = '/accountsDb';

    constructor(private message: SetMessageService, private http: HttpClient, private activeUser: AuthenticationService) {}

    getAll(): Promise<any> {
        if(!this.activeUser.isPermitted['to_view_accounts']){
            this.message.set({ status: 405, message: 'insufficient permissions'});
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
                    this.message.set(error)
                })
        }

    }

    getList(): Promise<any> {
        if(!this.activeUser.isPermitted['to_view_accounts']){
            this.message.set({ status: 405, message: 'insufficient permissions'});
        }

        return Promise.reject({ status: '', message: 'method not yet defined'})
            .catch((result: any) => {
                this.message.set(result);
            })

    }

    getOne(): Promise<any> {
        if(!this.activeUser.isPermitted['to_view_accounts']){
            this.message.set({ status: 405, message: 'insufficient permissions'});
        }

        else {
            return Promise.reject({ status: '', message: 'method not yet defined'})
        }

    }

    addRecord(form: AccountModel): Promise<any> {
        if(!this.activeUser.isPermitted['to_add_accounts']) {
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

    deleteRecord(account_id: string): Promise<any> {

        if(!this.activeUser.isPermitted['to_delete_accounts']){
            this.message.set({ status: 405, message: 'insufficient permissions'});
        }
        else {
            return this.http.delete(`${this.baseUrl}/${account_id}`, {observe: "response"})
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

    editRecord(account: AccountModel): Promise<any> {
        if(!this.activeUser.isPermitted['to_edit_accounts']){
            this.message.set({ status: 405, message: 'insufficient permissions'});
        }
        else {
            return this.http.put(`${this.baseUrl}/${account.account_id}`, account.account_permissions, {observe: "response"})
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
}