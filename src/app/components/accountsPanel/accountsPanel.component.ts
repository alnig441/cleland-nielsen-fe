import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { AccountServices } from "../../services/account.services";
import {PermissionServices} from "../../services/permission.services";
import {HttpAuthService} from "../../services/httpAuth.service";

@Component({
    selector: 'app-accounts-panel',
    template: require('./accountsPanel.component.pug'),
    encapsulation: ViewEncapsulation.None
})

export class AccountsPanelComponent implements OnInit {

    constructor(private activeUser: HttpAuthService, private accountService: AccountServices, private permissionService: PermissionServices) {}

    ngOnInit(): void {
        this.accountService.getAll();
        this.permissionService.getAll();
        console.log('acctPanel comp init', this.activeUser.isPermitted);
    }

    private validateList(permission: any, i: any): any {

        return this.accountService.accounts[i].account_permissions.find((uuid) => {
           return uuid == permission
        }) ? false : true;

        // console.log('show me result ', this.accountService.accounts[i].account_name, permission, result)
        //
        // return result ? false : true;
    }
}