
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import 'rxjs/add/operator/toPromise';
import { ErrorParser } from './errorParser';
import { UserModel } from "../models/user.model";
import { HttpAuthService } from "./httpAuth.service";
import { Router } from "@angular/router";

@Injectable()

export class UserServices {

    errorParser = new ErrorParser();
    users: UserModel[] = new Array();
    baseUrl = '/usersDb';
    error: any;
    information: any;

    constructor(private http: HttpClient, private activeUser: HttpAuthService, private router: Router) {}

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

                    return Promise.resolve('success');
                })
                .catch(this.errorParser.handleError)
        }

    }

    getOne(): Promise<any> {
        if(!this.activeUser.isPermitted['to_view_users']){
            return Promise.reject({ status: 405, message: 'insufficient permissions'})
                .catch(this.errorParser.handleError);
        }

        else {
            return Promise.reject({ status: '', message: 'method not yet defined'})
        }

    }

    getList(): Promise<any> {
        if(!this.activeUser.isPermitted['to_view_users']){
            return Promise.reject({ status: 405, message: 'insufficient permissions'})
                .catch(this.errorParser.handleError);
        }

        else {
            return Promise.reject({ status: '', message: 'method not yet defined'})
        }

    }

    addItem(form: UserModel): Promise<any> {
        if(!this.activeUser.isPermitted['to_add_users']) {
            return Promise.reject({ status : 405 , message : 'insufficient permissions'})
                .catch(this.errorParser.handleError)
                .catch((error: any)=>{
                    this.error = error;
                    this.clearRegisters();
                })
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

    deleteItem(user_id: string): Promise<any> {

        if(!this.activeUser.isPermitted['to_delete_users']){
            return Promise.reject({ status: 405, message: 'insufficient permissions'})
                .catch(this.errorParser.handleError)
                .catch((error: any) => {
                    this.error = error;
                    this.clearRegisters();
                })
        }
        else {
            return this.http.delete(`${this.baseUrl}/${user_id}`, {observe: "response"})
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

    editItem(): Promise<any> {
        if(!this.activeUser.isPermitted['to_edit_users']){
            return Promise.reject({ status: 405, message: 'insufficient permissions'})
                .catch(this.errorParser.handleError)
        }
        else {
            return Promise.reject({ status: '', message: 'method not yet defined'})
        }
    }

    private clearRegisters(status?: any) {
        setTimeout(() => {
            this.information = null;
            this.error = null;
        },3000)
    }


}