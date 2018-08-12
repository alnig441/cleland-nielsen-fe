import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { AccountServices } from "../../../../services/account.services";
import { PermissionServices } from "../../../../services/permission.services";
import { HttpAuthService } from "../../../../services/httpAuth.service";
import { AccountModel } from "../../../../models/account.model";
import { ActivatedRoute } from "@angular/router";
import { ServiceModelManagerService } from "../../../../services/service-model-manager.service";
import { ListValidator } from "../../../../classes/listValidator";
import { PermissionModel } from "../../../../models/permission.model";

@Component({
    selector: 'app-accounts',
    template: require('./accounts.component.pug'),
    encapsulation: ViewEncapsulation.None
})

export class AccountsComponent implements OnInit {

    validator = new ListValidator();
    doEdit = {};
    tempPlaceholder: string = 'add permission';
    accountUpdated: boolean = false;

    constructor(private formManager: ServiceModelManagerService, private activatedRoute: ActivatedRoute, private activeUser: HttpAuthService, private accountService: AccountServices, private permissionService: PermissionServices){}

    ngOnInit(): void {
        this.formManager.setService(this.activatedRoute.snapshot.url[0].path);
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
            this.accountService.editRecord(account)
        }

        this.accountUpdated = false;
    }

    delete(account_id: any, i?: any): void {
        this.accountService.deleteRecord(account_id)
    }
}