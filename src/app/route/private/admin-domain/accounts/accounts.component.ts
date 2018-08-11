import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { AccountServices } from "../../../../services/account.services";
import { PermissionServices } from "../../../../services/permission.services";
import { HttpAuthService } from "../../../../services/httpAuth.service";
import { AccountModel } from "../../../../models/account.model";
import { CompInitService } from "../../../../services/comp-init.service";
import { ActivatedRoute } from "@angular/router";
import { ServiceFormManagerService } from "../../../../services/service-form-manager.service";
import { ListValidator } from "../../../../classes/listValidator";
import { PermissionModel } from "../../../../models/permission.model";

@Component({
    selector: 'app-accounts',
    template: require('./accounts.component.pug'),
    encapsulation: ViewEncapsulation.None
})

export class AccountsComponent implements OnInit {

    // private accountForm: AccountModel = new AccountModel('uuid_generate_v4()');
    validator = new ListValidator();
    doEdit = {};
    tempPlaceholder: string = 'add permission';
    accountUpdated: boolean = false;

    constructor(private formManager: ServiceFormManagerService, private activatedRoute: ActivatedRoute, private compInit: CompInitService, private activeUser: HttpAuthService, private accountService: AccountServices, private permissionService: PermissionServices){}

    ngOnInit(): void {
        console.log('account comp initialization...')

        this.formManager.setService(this.activatedRoute.snapshot.url[0].path);
        if(this.activeUser.isPermitted['to_view_accounts']){
            this.compInit.initialize('permissions')
                .then((result: any) => {
                    console.log('... permissions loaded '+ result + ': ', this.activatedRoute.snapshot.url[0].path);
                    // this.formManager.setService(this.activatedRoute.snapshot.url[0].path);
                })
            this.compInit.initialize('accounts')
                .then((result: any) => {
                    console.log('... accounts loaded: ', result);
                })
        }
    }

    edit(account: any, i: any) :void {
        this.doEdit[account.account_name] = true;
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