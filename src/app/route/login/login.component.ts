import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import {LoginModel} from "../../models/login.model";

@Component({
    selector: 'app-login',
    template: require('./login.component.pug'),
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class LoginComponent implements OnInit {

    loginModel = new LoginModel('', '');

    constructor(private http: HttpClient, private router: Router){}

    public ngOnInit():void {
        console.log('login component initialised');
    }

    onSubmit(): void {
        console.log('login form submitted: ', this.loginModel);
    }

    onCancel(): void {
        this.router.navigateByUrl('/');
    }
}