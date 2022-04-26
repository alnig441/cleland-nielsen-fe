import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { NavigationExtras, Router } from "@angular/router";

import { LoginModel } from "../../../models/login.model";
import { AuthenticationServices } from "../../../services/authentication.services";
import { PermissionServices } from "../../../services/permission.services";

@Component({
    selector: "app-home",
    template: require("./home.component.pug"),
    styleUrls: [ "./home.component.scss" ]
})
export class HomeComponent implements OnInit {

    loginModel = new LoginModel("", "");
    message: string;

    constructor(
        private http: HttpClient,
        private router: Router,
        private authenticator: AuthenticationServices,
        private permissionService: PermissionServices
    ) {}

    public ngOnInit(): void {
    }

    onSubmit(): void {
      //webpack dev login bypass
      if(process.env.NODE_ENV) {
        this.authenticator.isLoggedIn = true;
        this.authenticator.isAdmin = true;
        this.authenticator.language = "english";
        this.authenticator.redirectUrl = "/private/user-domain";
        let navigationExtras : NavigationExtras = {
          queryParamsHandling:"preserve",
          preserveFragment: true
        };
        this.router.navigate([this.authenticator.redirectUrl], navigationExtras);
      }

      else {
        this.authenticator.login(this.loginModel)
          .then((user: any) => {
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
                    let navigationExtras : NavigationExtras = {
                        queryParamsHandling: 'preserve',
                        preserveFragment: true
                    };

                    this.setRedirectUrl();
                    this.router.navigate([this.authenticator.redirectUrl],navigationExtras);
                })
                .catch(error => console.log(error));
            }
          })
          .catch((error: any) => {
            this.message = error.message;
            let x = setTimeout(() => {
              this.message = undefined;
              clearTimeout(x);
            },2500)
          })
      }
    }

    setRedirectUrl(): void {
      if (this.authenticator.isPermitted['to_view_images'] || this.authenticator.isPermitted['to_view_videos']) {
        this.authenticator.redirectUrl = '/private/user-domain';
        this.authenticator.startPage = this.authenticator.isPermitted['to_view_images'] ?
          '/images':
          '/videos';
      }
      else if (this.authenticator.isPermitted['to_view_users'] || this.authenticator.isPermitted['to_view_accounts'] || this.authenticator.isPermitted['to_view_permissions']) {
        this.authenticator.redirectUrl = '/private/admin-domain';
        this.authenticator.startPage = this.authenticator.isPermitted['to_view_users'] ?
          '/users':
          this.authenticator.isPermitted['to_view_accounts'] ?
            '/accounts':
            '/permissions';
      }
    }
}
