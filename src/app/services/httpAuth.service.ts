import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { LoginModel } from "../models/login.model";
import "rxjs/add/operator/toPromise";
import { PermissionModel } from "../models/permission.model";

@Injectable()

export class HttpAuthService {

    isLoggedIn = false;
    isAdmin = false;
    isPermitted = {};
    private permissions: PermissionModel[];

    redirectUrl: string;

    constructor(private http: HttpClient) {}

    login(form: LoginModel) {

        this.redirectUrl = "/private";

        this.getPermissions();

        return this.http.post<any>('/login', form)
            .map(activeUser => {

                if(activeUser && activeUser.token){
                    localStorage.setItem('token', activeUser.token);
                    this.isLoggedIn = true;
                    this.isAdmin = activeUser.userParameters.administrator ? true : false;
                }

                if(activeUser.userParameters.permissions && this.permissions){
                    activeUser.userParameters.permissions.forEach((uuid : string) => {
                        this.permissions.find(permit => {
                            return permit.permission_id === uuid ? this.isPermitted[permit.permission_name] = true : null;
                            }
                        )

                    })
                }
                return activeUser;
            })
    }

    private getPermissions(): Promise<any> {
        return this.http.get('/permissionsDb', { observe: "response"})
            .toPromise()
            .then(result => {
                this.permissions = result.body as PermissionModel[];
            })
    }


    public logout(): void {
        localStorage.removeItem('token');
        this.isAdmin = false;
        this.isLoggedIn = false;
        this.redirectUrl = "/home";
    }
}