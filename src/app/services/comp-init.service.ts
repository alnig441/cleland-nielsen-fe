import { Injectable } from "@angular/core";
import { ImageServices } from "./image.services";
import { UserServices } from "./user.services";
import { AccountServices } from "./account.services";
import { PermissionServices } from "./permission.services";
import { ErrorParser } from "./errorParser";
import { HttpAuthService } from "./httpAuth.service";
import { Router } from "@angular/router";

@Injectable()

export class CompInitService {

    errorParser = new ErrorParser();

    constructor(private router: Router, private activeUser: HttpAuthService, private images: ImageServices, private users: UserServices, private accounts: AccountServices, private permissions: PermissionServices ) {}

    initialize(service: string): Promise<any> {

        return this[service].getAll()
            .then((result: any) => {
                console.log(result);
                return Promise.resolve(result);
            })
            .catch(this.errorParser.handleError)
            .catch((error: any) => {
                this[service].error = error;
                if(error.status === 401) {
                    setTimeout(() => {
                        this.activeUser.logout();
                        this.router.navigate(["/login"]);
                        this[service].error = null;
                    }, 3000)
                }
                setTimeout(()=> {
                    this[service].error = null;
                },3000)
            })
    }
}