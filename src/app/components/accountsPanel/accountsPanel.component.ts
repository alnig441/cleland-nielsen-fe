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
    doEdit = {};
    tempPlaceholder: string ='add permission';

    constructor(private activeUser: HttpAuthService, private accountService: AccountServices, private permissionService: PermissionServices) {}

    ngOnInit(): void {
        // this.accountService.getAll();
        // this.permissionService.getAll();
        console.log('acctPanel comp init', this.activeUser.isPermitted, this.permissionService.permissions);
    }

    addPermission(permission: string, i: number): void {
        console.log('adding permission', permission);
        this.accountService.accounts[i].account_permissions.push(permission);
        this.tempPlaceholder = permission;
    }

    revokePermission(permission: string, i: number): void {
        console.log('revoking permission', permission);
        let revisedPermissions = this.accountService.accounts[i].account_permissions.filter((uuid: any) => {
            return uuid !== permission;
        });
        this.accountService.accounts[i].account_permissions = revisedPermissions;
    }

    edit(account: any, i: any) :void {
        console.log('permitted: ', this.activeUser.isPermitted['to_edit_accounts']);
        if(this.activeUser.isPermitted['to_edit_accounts']){
            console.log('editing account: ', account);
            this.doEdit[account.account_name] = true;
        }
    }

    delete(account: any, i: any): void {
        if(this.activeUser.isPermitted['to_delete_accounts']){
            console.log('deleting account: ', account);
        }
    }

    done(account: any, i: any): void {
        console.log('done editing account: ', account);
        this.doEdit = {};
        this.tempPlaceholder = 'add permission';
    }
}