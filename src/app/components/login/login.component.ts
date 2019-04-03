import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { LoginModel } from "../../models/login.model";
import { AuthenticationService } from "../../services/authentication.service";
import { PermissionServices } from "../../services/permission.services";
import { ErrorParser } from "../../services/error-parser";

const $ = require('jquery');

@Component({
    selector: 'app-login',
    template: require('./login.component.pug'),
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class LoginComponent implements OnInit {

    errorParser = new ErrorParser();
    loginModel = new LoginModel('', '');
    message: string;

    constructor(
        private http: HttpClient,
        private router: Router,
        private authenticator: AuthenticationService,
        private permissionService: PermissionServices
    ){}

    public ngOnInit():void {
    }

    onSubmit(): void {

      this.authenticator.login(this.loginModel)
        .then((user: any) => {
          if(this.authenticator.isLoggedIn) {

            $('#loginModal').modal('hide');

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

                  this.router.navigate([this.authenticator.redirectUrl],navigationExtras);
              })
              .catch(this.errorParser.handleError)
              .catch(error => console.log(error));
          }
        })
        .catch(this.errorParser.handleError)
        .catch((error: any) => {
          this.message = error.message;
        })

    }

    onCancel(): void {
        this.authenticator.logout();
        this.router.navigate([this.authenticator.redirectUrl]);
    }
}
