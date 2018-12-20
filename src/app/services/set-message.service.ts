import { Injectable } from "@angular/core";
import { AuthenticationService } from "./authentication.service";

@Injectable()

export class SetMessageService {
    
    private response: any = {};
    private responseType: string;
    private responseState : string = 'hidden';

    constructor(
        private activeUser: AuthenticationService) {}

    set(message?: any): any {
        this.responseType = null;
        this.response = {};

        let httpStatus = parseInt(message.status) ? parseInt(message.status): null;
        this.responseType = httpStatus == null ? 'info': httpStatus < 300 ? 'success': httpStatus < 400 ? 'warning' : 'danger';

        this.response = message;

        this.responseState = 'visible';

        setTimeout(() => {
            this.responseState = 'hidden';
            if(message.forceLogout){
                this.activeUser.logout();
            }
        },3000)
    }

    getResponseState():string {
        return this.responseState;
    }

    getResponseType(): string {
        return this.responseType;
    }
}