import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import "rxjs/add/operator/toPromise";
import { Router } from "@angular/router";
import { LoginModel } from "../models/login.model";
import { SetMessageService } from "./set-message.service";


@Injectable()

export class AuthenticationService {

    activityTimer : any;
    isLoggedIn = false;
    isAdmin = false;
    isPermitted = {};
    timer: any;
    language: string;

    redirectUrl: string;
    startPage: string;

    constructor(
        private http: HttpClient,
        private router: Router,
        private message: SetMessageService,
    ) {}

    login(form: LoginModel): Promise<any> {

      return this.http.post('/login', form, { observe: "body"})
        .toPromise()
        .then(activeUser => {
          if (activeUser && activeUser['token']) {
            localStorage.setItem('token', activeUser['token']);
            this.isLoggedIn = true;
            this.isAdmin = activeUser['userParameters']['administrator'] ? true : false;
            this.language = activeUser['userParameters']['language'] ? activeUser['userParameters']['language'] : 'english' ;
          }
          this.setActivityTimer();
          return activeUser;
        })
        .catch((error) => {
          throw error;
        })
    }


    setActivityTimer(): void {
        this.activityTimer = 0;

        this.timer = setInterval(() => {
            this.activityTimer ++;

            if (this.activityTimer == 300) {
                this.message.set({ status: 408, statusText: 'Inactivity alert! Logging out in 10 secs. Press cancel to continue.', forceLogout: true })
            }

        }, 1000)
    }

    public logout(): void {
        localStorage.removeItem('token');
        clearInterval(this.timer);
        this.activityTimer = 0;
        this.isAdmin = false;
        this.isLoggedIn = false;
        this.isPermitted = {};
        this.redirectUrl = "/home";
        this.startPage = '';
        this.router.navigate([this.redirectUrl]);
    }
}
