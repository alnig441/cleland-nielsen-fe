import { Injectable } from "@angular/core";
import {
    CanActivate,
    Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    CanActivateChild,
    NavigationExtras,
    CanLoad,
    Route
} from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable()

export class AuthGuardService implements CanActivate, CanActivateChild, CanLoad {

    constructor(private authenticate: AuthService, private router: Router) {}

    checkLogin(url: string): boolean {
        if(this.authenticate.isLoggedIn){
            console.log('authguard - checking login status: ', url)
            return true;
        } else {
            console.log('user not logged in');
        }

        this.authenticate.redirectUrl = url;
        let sessionId = 123456789;
        let navigationExtras: NavigationExtras = {
            queryParams: { 'session_id': sessionId},
            fragment: 'anchor'
        }

        this.router.navigate(['/login'], navigationExtras);
        return false;
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let url: string = state.url;
        return this.checkLogin(url);
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state);
    }

    canLoad(route: Route): boolean {
        let url = `${route.path}`;
        return this.checkLogin(url);
    }

}