import { Component, DoCheck, OnInit, ViewEncapsulation } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UserServices } from "../../../services/user.services";
import { AccountServices } from "../../../services/account.services";
import { PermissionServices } from "../../../services/permission.services";
import { ServiceModelManagerServices } from "../../../services/service-model-manager.services";
import { AuthenticationServices } from "../../../services/authentication.services";

@Component({
    selector: 'app-admin-domain',
    template: require('./admin-domain.component.pug'),
    styleUrls: ['./admin-domain.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class AdminDomainComponent implements OnInit, DoCheck {

    private recordModel: any;

    constructor(
        private formManager: ServiceModelManagerServices,
        private activeUser: AuthenticationServices,
        private users: UserServices,
        private accounts: AccountServices,
        private permissions: PermissionServices,
        private http: HttpClient
    ) {}

    ngOnInit(): void {
        this.permissions.getAll()
        this.accounts.getAll()
        this.users.getAll()
    }

    ngDoCheck(): void {
        if(this.formManager.getService()){
            this.recordModel = this.formManager.getRecordModel();
        }
    }

    filter(): void{
    }

    onSubmit(): void {
        this[this.formManager.getService()].addRecord(this.recordModel);
        this.recordModel = this.formManager.getRecordModel();
    }
}
