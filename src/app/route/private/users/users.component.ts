import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { AccountServices } from "../../../services/account.services";
import {HttpAuthService} from "../../../services/httpAuth.service";
import {UserModel} from "../../../models/user.model";

@Component({
    selector: 'app-users',
    template: require('./users.component.pug'),
    encapsulation: ViewEncapsulation.None
})

export class UsersComponent implements OnInit {

    private userForm: UserModel = new UserModel('uuid_generate_v4()');

    constructor(private activeUser: HttpAuthService, private accountService: AccountServices) {}

    ngOnInit(): void {
        this.accountService.getAll()
            .catch((error: any ) => {
                this.accountService.error = error;
                setTimeout(() => {
                    this.accountService.error = null;
                }, 3000)
            })
        // console.log('user comp init', this.activeUser.isPermitted, this.accountService.accounts);
    }
}