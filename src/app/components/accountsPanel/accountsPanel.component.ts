import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { AccountServices } from "../../services/account.services";
import { PermissionServices } from "../../services/permission.services";
import { HttpAuthService } from "../../services/httpAuth.service";
import { ListValidator } from "../../classes/listValidator";
import {CompInitService} from "../../services/comp-init.service";
import {PermissionModel} from "../../models/permission.model";
import {AccountModel} from "../../models/account.model";

@Component({
    selector: 'app-accounts-panel',
    template: require('./accountsPanel.component.pug'),
    encapsulation: ViewEncapsulation.None
})

export class AccountsPanelComponent implements OnInit {

    validator = new ListValidator();
    doEdit = {};
    tempPlaceholder: string ='add permission';
    accountUpdated: boolean = false;

    constructor(private compInit: CompInitService, private activeUser: HttpAuthService, private accountService: AccountServices, private permissionService: PermissionServices) {}

    ngOnInit(): void {
        if(this.activeUser.isPermitted['to_view_accounts']){
            this.compInit.initialize('accounts')
                .then((result: any) => {
                    console.log('account panel comp init ', result);
                })
        }
    }

    edit(account: any, i: any) :void {
        if(!this.activeUser.isPermitted['to_edit_accounts']){
            this.accountService.error = { status: 405, message: 'insufficient permissions' }
            setTimeout(() => {
                this.accountService.error = null;
            },3000)
        }
        else{
            this.doEdit[account.account_name] = true;
        }
    }

    grantPermission(permission: string, i: number): void {
        if(permission == 'all'){
            let tempArr: string[] = new Array();
            this.permissionService.permissions.forEach((permission: PermissionModel) => {
                tempArr.push(permission.permission_id);
            })
            this.accountService.accounts[i].account_permissions = tempArr;
        }
        else {
            this.accountService.accounts[i].account_permissions.push(permission);
            this.tempPlaceholder = permission;
        }
        this.accountUpdated = true;
    }

    revokePermission(permission: string, i: number): void {
        let revisedPermissions = this.accountService.accounts[i].account_permissions.filter((uuid: any) => {
            return uuid !== permission;
        });
        this.accountService.accounts[i].account_permissions = revisedPermissions;

        this.accountUpdated = true;
    }

    done(account: any, i: any): void {
        this.doEdit = {};
        this.tempPlaceholder = 'add permission';

        if(this.accountUpdated){
            this.accountService.editItem(account)
        }

        this.accountUpdated = false;
    }

    delete(account_id: any, i?: any): void {
        this.accountService.deleteItem(account_id)
    }
}