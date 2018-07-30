import { Injectable } from "@angular/core";

@Injectable()

export class ErrorMessageServices {

    private error: any;

    setMessage(error: any): void {
        this.error = error;
        setTimeout(() => {
            this.error = {};
        }, 3000)
    }

    getMessage(): string {
        return this.error;
    }
}