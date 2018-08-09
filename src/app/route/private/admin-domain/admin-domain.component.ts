import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UserServices } from "../../../services/user.services";
import { AccountServices } from "../../../services/account.services";
import { PermissionServices } from "../../../services/permission.services";
import { UserModel } from "../../../models/user.model";
import { AccountModel } from "../../../models/account.model";
import { PermissionModel } from "../../../models/permission.model";
import { ServiceFormManagerService } from "../../../services/service-form-manager.service";
import { SetMessageService } from "../../../services/setMessage.service";
import { HttpAuthService } from "../../../services/httpAuth.service";

@Component({
    selector: 'app-admin',
    template: require('./admin-domain.component.pug'),
    styleUrls: ['./admin-domain.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class AdminDomainComponent implements OnInit {

    private itemForm: any;

    constructor( private formManager: ServiceFormManagerService, private setMessage: SetMessageService, private activeUser: HttpAuthService, private users: UserServices, private accounts: AccountServices, private permissions: PermissionServices, private http: HttpClient) {}

    ngOnInit(): void {
        console.log('admin-domain component initialised');
    }
}