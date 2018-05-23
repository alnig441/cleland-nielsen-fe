import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { of } from "rxjs/observable/of";
import { delay } from "rxjs/operator/delay";

@Injectable()

export class AuthService {

    isLoggedIn = false;

    redirectUrl: string;

    login(): Observable<boolean> {

        return of(true).delay(1000).do(val => this.isLoggedIn = true);
    }

    logout(): void {
        this.isLoggedIn = false;
    }
}