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
import { HttpAuthService } from "./httpAuth.service";

@Injectable()

export class AuthGuardService implements CanActivate, CanActivateChild, CanLoad {

    constructor(private  httpAuth: HttpAuthService, private router: Router) {}

    checkLogin(url: string): boolean {

        if(this.httpAuth.isLoggedIn) {
            return true;
        }

        this.httpAuth.redirectUrl = url;
        this.router.navigate(['/login']);

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