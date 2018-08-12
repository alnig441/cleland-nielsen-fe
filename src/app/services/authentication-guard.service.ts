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
import { AuthenticationService } from "./authentication.service";

@Injectable()

export class AuthenticationGuardService implements CanActivate, CanActivateChild, CanLoad {

    constructor(private  authenticator: AuthenticationService, private router: Router) {}

    checkLogin(url: string): boolean {

        if(this.authenticator.isLoggedIn) {
            return true;
        }

        this.authenticator.redirectUrl = url;
        this.router.navigate(['/login']);

        return false;
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        console.log('auth guard canActivate', route, state);
        let url: string = state.url;
        return this.checkLogin(url);
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        console.log('auth guard canActivateChild', route, state)
        return this.canActivate(route, state);
    }

    canLoad(route: Route): boolean {
        console.log('auth guard canLoad', route);
        let url = `${route.path}`;
        return this.checkLogin(url);
    }

}