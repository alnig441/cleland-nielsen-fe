import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { AccountServices } from "../../../services/account.services";
import { PermissionServices } from "../../../services/permission.services";
import { HttpAuthService } from "../../../services/httpAuth.service";

@Component({
    selector: 'app-accounts',
    template: require('./accounts.component.pug'),
    encapsulation: ViewEncapsulation.None
})

export class AccountsComponent implements OnInit {

    constructor(private activeUser: HttpAuthService, private accountService: AccountServices, private permissionService: PermissionServices){}

    ngOnInit(): void {
        console.log('accounts comp init', this.activeUser.isPermitted);
        this.accountService.getAll();
        this.permissionService.getAll();
        // this.accountService.error = null;
    }
}