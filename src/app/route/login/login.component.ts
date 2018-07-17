import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { LoginModel } from "../../models/login.model";
import { AuthService } from "../../services/auth.service";
import { HttpAuthService } from "../../services/httpAuth.service";

@Component({
    selector: 'app-login',
    template: require('./login.component.pug'),
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class LoginComponent implements OnInit {


    loginModel = new LoginModel('', '');

    constructor(private http: HttpClient, private router: Router, private authService: AuthService, private httpAuth: HttpAuthService){}

    public ngOnInit():void {
        // console.log('login component initialised');
    }

    onSubmit(): void {
        // console.log('login form submitted: ', this.loginModel);

        this.httpAuth.login(this.loginModel).subscribe((user) => {
            // console.log('from httpAuthService: ', user);

            if(this.httpAuth.isLoggedIn) {
                // console.log('checking login status', this.httpAuth.isLoggedIn);
                let redirect = this.httpAuth.redirectUrl ? this.httpAuth.redirectUrl : '/private';
                let navigationExtras : NavigationExtras = {
                    queryParamsHandling: 'preserve',
                    preserveFragment: true
                };

                // console.log('this router: ', this.router);

                this.router.navigate([redirect],navigationExtras);
            }

        })

        // this.authService.login(this.loginModel).subscribe(() => {
        //     console.log("am I logged in? ", this.authService.isLoggedIn);
        //
        //     if(this.authService.isLoggedIn) {
        //         let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/private';
        //         let navigationExtras: NavigationExtras = {
        //             queryParamsHandling: 'preserve',
        //             preserveFragment: true
        //         };
        //         this.router.navigate([redirect], navigationExtras);
        //     }
        //
        // })
    }

    onCancel(): void {
        this.httpAuth.logout();
        // this.authService.logout();
        this.router.navigate([this.httpAuth.redirectUrl]);
    }
}