import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { LoginModel } from "../../models/login.model";
import { HttpAuthService } from "../../services/httpAuth.service";

@Component({
    selector: 'app-login',
    template: require('./login.component.pug'),
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class LoginComponent implements OnInit {


    loginModel = new LoginModel('', '');

    constructor(private http: HttpClient, private router: Router, private httpAuth: HttpAuthService){}

    public ngOnInit():void {
        // console.log('login component initialised');
    }

    onSubmit(): void {

        this.httpAuth.login(this.loginModel).subscribe((user) => {

            if(this.httpAuth.isLoggedIn) {
                let redirect = this.httpAuth.redirectUrl ? this.httpAuth.redirectUrl : '/private';
                let navigationExtras : NavigationExtras = {
                    queryParamsHandling: 'preserve',
                    preserveFragment: true
                };

                this.router.navigate([redirect],navigationExtras);
            }

        })

    }

    onCancel(): void {
        this.httpAuth.logout();
        this.router.navigate([this.httpAuth.redirectUrl]);
    }
}