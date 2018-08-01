import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { AccountServices } from "../../../services/account.services";
import {HttpAuthService} from "../../../services/httpAuth.service";
import {UserModel} from "../../../models/user.model";
import {CompInitService} from "../../../services/comp-init.service";

@Component({
    selector: 'app-users',
    template: require('./users.component.pug'),
    encapsulation: ViewEncapsulation.None
})

export class UsersComponent implements OnInit {

    private userForm: UserModel = new UserModel('uuid_generate_v4()');

    constructor(private compInit: CompInitService, private activeUser: HttpAuthService, private accountService: AccountServices) {}

    ngOnInit(): void {
        if(this.activeUser.isPermitted['to_view_users']){
            this.compInit.initialize('accounts')
                .then((result: any) => {
                    console.log('user comp init ', result);
                })
        }
    }
}