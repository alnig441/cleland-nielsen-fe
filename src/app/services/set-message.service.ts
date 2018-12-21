import { Injectable } from "@angular/core";

@Injectable()

export class SetMessageService {
    
    private response: any = {};
    private responseState : string = 'hidden';
    private forceLogout: boolean = false;

    constructor(
    ) {}

    set(message?: any): any {

        this.response = message;
        this.responseState = 'visible';
        this.forceLogout = message.forceLogout ? message.forceLogout : false;

        let httpStatus = parseInt(message.status) ? parseInt(message.status): null;
        this.response.type = httpStatus == null ? 'info': httpStatus < 300 ? 'success': httpStatus < 400 ? 'warning' : 'danger';

        setTimeout(() => {
            this.responseState = 'hidden';
        },3000)

    }

    cancelForceLogout(): void {
        this.forceLogout = false;
    }

    getResponseState(): string {
        return this.responseState;
    }

    getForceLogout(): boolean {
        return this.forceLogout;
    }

    getResponse(): any {
        return this.response;
    }

    reset(): any {
        this.response = {};
        this.responseState = 'hidden';
        this.forceLogout = false;
    }

}