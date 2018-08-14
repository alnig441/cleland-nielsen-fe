import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "./authentication.service";

@Injectable()

export class SetMessageService {
    
    private response: any = {};
    private responseState : string = 'hidden';

    constructor(
        private router: Router,
        private activeUser: AuthenticationService) {}

    set(error?: any): any {
        this.response = {};

        error.status != 200 ? this.response.failure = error : this.response.success = error;
        this.responseState = 'visible';

        setTimeout(() => {
            this.responseState = 'hidden';
            if(error.forceLogout){
                this.activeUser.logout();
                this.router.navigate(['/login'])
            }
        },3000)
    }

    getResponseState():string {
        return this.responseState;
    }
}