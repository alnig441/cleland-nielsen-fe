import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { LoginModel } from "../../models/login.model";
import { AuthenticationService } from "../../services/authentication.service";
import { PermissionServices } from "../../services/permission.services";
import { ErrorParser } from "../../services/error-parser";

@Component({
    selector: 'app-login',
    template: require('./login.component.pug'),
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class LoginComponent implements OnInit {

    errorParser = new ErrorParser();
    loginModel = new LoginModel('', '');

    constructor(private http: HttpClient, private router: Router, private authenticator: AuthenticationService, private permissionService: PermissionServices){}

    public ngOnInit():void {
        // console.log('login component initialised');
    }

    onSubmit(): void {

        this.authenticator.login(this.loginModel).subscribe((user : any) => {

            if(this.authenticator.isLoggedIn) {

                this.http.get('/permissionsDb', {observe: "response"})
                    .toPromise()
                    .then((result: any) => {
                        user.userParameters.permissions.forEach((uuid: string) => {
                            result.body.find((permit: any) => {
                                return permit.permission_id === uuid ? this.authenticator.isPermitted[permit.permission_name] = true: null;
                            })
                        })
                    })
                    .then(() => {
                        console.log('what user: ', user);
                        let redirect =  user.userParameters.type != 'standard_user' ? '/private/admin-domain': '/private/user-domain';
                        // let redirect = this.authenticator.redirectUrl ? this.authenticator.redirectUrl : '/private';
                        let navigationExtras : NavigationExtras = {
                            queryParamsHandling: 'preserve',
                            preserveFragment: true
                        };

                        this.router.navigate([redirect],navigationExtras);
                    })
                    .catch(this.errorParser.handleError)
                    .catch(error => console.log(error));
            }

        })

    }

    onCancel(): void {
        this.authenticator.logout();
        this.router.navigate([this.authenticator.redirectUrl]);
    }
}