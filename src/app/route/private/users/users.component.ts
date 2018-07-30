import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { AccountServices } from "../../../services/account.services";
import {HttpAuthService} from "../../../services/httpAuth.service";

@Component({
    selector: 'app-users',
    template: require('./users.component.pug'),
    encapsulation: ViewEncapsulation.None
})

export class UsersComponent implements OnInit {

    constructor(private activeUser: HttpAuthService, private accountService: AccountServices) {}

    ngOnInit(): void {
        console.log('user comp init', this.activeUser.isPermitted);

        // this.accountService.getAll();
    }
}