import { Injectable } from "@angular/core";

@Injectable()

export class SetMessageService {

    private message: any = {};
    private state : string = 'hidden';
    private forceLogout: boolean = false;

    constructor(
    ) {}

    set(message?: any): any {
        this.message = {}

        this.message = message;
        this.state = 'visible';
        this.forceLogout = message.forceLogout ? message.forceLogout : false;
        let delay = this.forceLogout ? 10000 : 2500 ;

        let httpStatus = parseInt(message.status) ? parseInt(message.status): null;
        this.message.type = httpStatus == null ? 'info': httpStatus < 300 ? 'success': httpStatus < 400 ? 'warning' : 'danger';

        setTimeout(() => {
            this.state = 'hidden';
        },delay)

    }

    get(): any {
        return this.message;
    }

    getState(): string {
        return this.state;
    }

    getForceLogout(): boolean {
        return this.forceLogout;
    }

    cancel(): void {
        this.forceLogout = false;
        this.state = 'hidden';
    }

    clear(): any {
        this.message = {};
    }

}
