import { Injectable } from "@angular/core";
import {ErrorMessageServices} from "./errorMessage.services";

@Injectable()

export class ErrorParserService {

    error: any;

    constructor(private errorMessage: ErrorMessageServices ){}

    handleError(error: any): Promise<any> {
        let err = {};

        console.log('show me new error: ', error);

        if (error.status === 401) {
            err = {
                status: error.status,
                message: 'SAY WHAT: unauthorized/expired token - please login again'
            }
        }

        else {
            err = error;
        }

        // this.setMessage(err);

        // throw err;

        throw this.setMessage(err);
    }

    setMessage(error: any): void {
        console.log('setting error message');
        this.error = error;
        setTimeout(() => {

            this.error = {};
        }, 3000)
        return error;
    }

    // getMessage(): string {
    //     return this.error;
    // }
}