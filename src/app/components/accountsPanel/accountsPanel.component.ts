import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { AccountServices } from "../../services/account.services";
import { PermissionServices } from "../../services/permission.services";
import { HttpAuthService } from "../../services/httpAuth.service";
import { ListValidator } from "../../classes/listValidator";
import {CompInitService} from "../../services/comp-init.service";

@Component({
    selector: 'app-accounts-panel',
    template: require('./accountsPanel.component.pug'),
    encapsulation: ViewEncapsulation.None
})

export class AccountsPanelComponent implements OnInit {

    validator = new ListValidator();
    doEdit = {};
    tempPlaceholder: string ='add permission';

    constructor(private compInit: CompInitService, private activeUser: HttpAuthService, private accountService: AccountServices, private permissionService: PermissionServices) {}

    ngOnInit(): void {
        if(this.activeUser.isPermitted['to_view_accounts']){
            this.compInit.initialize('accounts')
                .then((result: any) => {
                    console.log('account panel comp init ', result);
                })
        }
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
        if(!this.activeUser.isPermitted['to_edit_accounts']){
            this.accountService.error = { status: 405, message: 'insufficient permissions' }
            setTimeout(() => {
                this.accountService.error = null;
            },3000)
        }
        else{
            console.log('editing account: ', account);
            this.doEdit[account.account_name] = true;
        }
    }

    add(): void {
        this.accountService.addItem()
            .catch((error) =>{
                this.accountService.error = error;
                setTimeout(()=>{
                    this.accountService.error = null;
                }, 3000)
            })
    }

    delete(account: any, i: any): void {
        console.log('deleting account: ', account);
        this.accountService.deleteItem()
            .catch((error) =>{
                this.accountService.error = error;
                setTimeout(()=>{
                    this.accountService.error = null;
                }, 3000)
            })
    }

    done(account: any, i: any): void {
        console.log('done editing account: ', account);
        this.doEdit = {};
        this.tempPlaceholder = 'add permission';

        this.accountService.editItem()
            .catch((error) =>{
                this.accountService.error = error;
                setTimeout(()=>{
                    this.accountService.error = null;
                }, 3000)
            })
    }
}