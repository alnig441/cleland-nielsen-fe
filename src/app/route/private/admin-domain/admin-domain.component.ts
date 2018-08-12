import { Component, DoCheck, OnInit, ViewEncapsulation } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UserServices } from "../../../services/user.services";
import { AccountServices } from "../../../services/account.services";
import { PermissionServices } from "../../../services/permission.services";
import { ServiceModelManagerService } from "../../../services/service-model-manager.service";
import { HttpAuthService } from "../../../services/http-authentication.service";

@Component({
    selector: 'app-admin',
    template: require('./admin-domain.component.pug'),
    styleUrls: ['./admin-domain.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class AdminDomainComponent implements OnInit, DoCheck {

    private recordModel: any;

    constructor( private formManager: ServiceModelManagerService, private activeUser: HttpAuthService, private users: UserServices, private accounts: AccountServices, private permissions: PermissionServices, private http: HttpClient) {}

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
        console.log(`getting list for ${this.formManager.getService()}`);
    }

    onSubmit(): void {
        console.log(`adding ${this.formManager.getService()} record `, this.recordModel);
        this[this.formManager.getService()].addRecord(this.recordModel);
        this.recordModel = this.formManager.getRecordModel();
    }
}