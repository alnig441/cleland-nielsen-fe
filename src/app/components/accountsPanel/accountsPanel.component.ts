import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { AccountServices } from "../../services/account.services";
import { PermissionServices } from "../../services/permission.services";
import { HttpAuthService } from "../../services/httpAuth.service";
import { ListValidator } from "../../classes/listValidator";

@Component({
    selector: 'app-accounts-panel',
    template: require('./accountsPanel.component.pug'),
    encapsulation: ViewEncapsulation.None
})

export class AccountsPanelComponent implements OnInit {

    validator = new ListValidator();
    deEdit = {};
    tempPlaceholder: string ='add permission';

    constructor(private activeUser: HttpAuthService, private accountService: AccountServices, private permissionService: PermissionServices) {}

    ngOnInit(): void {
        this.accountService.getAll();
        this.permissionService.getAll();
        console.log('acctPanel comp init', this.activeUser.isPermitted);
    }

    addPermission(permission: string): void {
        console.log('adding permission', permission);
        this.tempPlaceholder = permission;
    }

    revokePermission(permission: string): void {
        console.log('revoking permission', permission);
    }

    edit() :void {

    }

    delete(): void {

    }

    done(): void {

    }
}