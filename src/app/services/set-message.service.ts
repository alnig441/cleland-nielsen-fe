import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "./authentication.service";

@Injectable()

export class SetMessageService {
    
    private response: any = {}
    
    constructor(
        private router: Router,
        private activeUser: AuthenticationService) {}

    set(error?: any): any {
        error.status != 200 ? this.response.failure = error : this.response.success = error;

        setTimeout(() => {
            this.response.failure = null;
            this.response.success = null;
            if(error.forceLogout){
                this.activeUser.logout();
                this.router.navigate(['/login'])
            }
        },3000)
    }
}