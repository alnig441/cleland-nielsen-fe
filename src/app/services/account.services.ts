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
    error: any;
    information: any;

    constructor(private http: HttpClient, private activeUser: HttpAuthService, private router: Router) {}

    getAll(): Promise<any> {
        if(!this.activeUser.isPermitted['to_view_accounts']){
            this.isNotPermitted()
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
                    this.error = error;
                })
        }

    }

    getList(): Promise<any> {
        if(!this.activeUser.isPermitted['to_view_accounts']){
            this.isNotPermitted()
        }

        else {
            return Promise.reject({ status: '', message: 'method not yet defined'})
        }

    }

    getOne(): Promise<any> {
        if(!this.activeUser.isPermitted['to_view_accounts']){
            this.isNotPermitted()
        }

        else {
            return Promise.reject({ status: '', message: 'method not yet defined'})
        }

    }

    addItem(form: AccountModel): Promise<any> {
        if(!this.activeUser.isPermitted['to_add_accounts']) {
            this.isNotPermitted()
        }

        else{
            return this.http.post(this.baseUrl, form, { observe : "response"})
                .toPromise()
                .then((result: any) => {
                    this.information = { status: result.status , message : result.body.message }
                    this.getAll();
                    this.clearRegisters();
                })
                .catch(this.errorParser.handleError)
                .catch((error: any) => {
                    this.error = error;
                    this.clearRegisters();
                    if(error.forceLogout){
                        setTimeout(() => {
                            this.activeUser.logout();
                            this.router.navigate(["/login"]);
                        }, 3000)
                    }
                })
        }
    }

    deleteItem(account_id: string): Promise<any> {

        if(!this.activeUser.isPermitted['to_delete_accounts']){
            this.isNotPermitted()
        }
        else {
            return this.http.delete(`${this.baseUrl}/${account_id}`, {observe: "response"})
                .toPromise()
                .then((response: any) => {
                    this.information = { status: response.status , message: response.body.message };
                    this.getAll();
                    this.clearRegisters();
                })
                .catch(this.errorParser.handleError)
                .catch((error: any) => {
                    this.error = error;
                    this.clearRegisters();
                    if(error.forceLogout){
                        setTimeout(() => {
                            this.activeUser.logout();
                            this.router.navigate(["/login"]);
                        }, 3000)
                    }
                })
        }
    }

    editItem(account: AccountModel): Promise<any> {
        if(!this.activeUser.isPermitted['to_edit_accounts']){
            this.isNotPermitted()
        }
        else {
            return this.http.put(`${this.baseUrl}/${account.account_id}`, account.account_permissions, {observe: "response"})
                .toPromise()
                .then((response: any) => {
                    this.information = { status: response.status, message: response.body.message };
                    this.getAll();
                    this.clearRegisters();
                })
                .catch(this.errorParser.handleError)
                .catch((error: any) => {
                    this.error = error;
                    this.clearRegisters();
                    if(error.forceLogout){
                        setTimeout(() => {
                            this.activeUser.logout();
                            this.router.navigate(["/login"]);
                        }, 3000)
                    }
                })
        }
    }

    private clearRegisters(status?: any) {
        setTimeout(() => {
            this.information = null;
            this.error = null;
        },3000)
    }

    private isNotPermitted(): Promise<any> {
        return Promise.reject({ status: 405, message: 'insufficient permissions'})
            .catch(this.errorParser.handleError)
            .catch((error: any) => {
                this.error = error;
                this.clearRegisters();
            })
    }

}