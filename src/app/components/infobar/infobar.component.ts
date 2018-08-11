import {
    Component, OnInit, ViewEncapsulation, DoCheck
} from "@angular/core";
import { HttpAuthService } from "../../services/httpAuth.service";
import { UserServices } from "../../services/user.services";
import { AccountServices } from "../../services/account.services";
import { PermissionServices } from "../../services/permission.services";
import { ServiceFormManagerService } from "../../services/service-form-manager.service";


@Component({
    selector: 'app-infobar',
    template: require('./infobar.component.pug'),
    encapsulation: ViewEncapsulation.None
})

export class InfobarComponent implements OnInit, DoCheck {

    recordModel: any;

    constructor(private formManager: ServiceFormManagerService, private users: UserServices, private accounts: AccountServices, private permissions: PermissionServices, private activeUser: HttpAuthService) {}

    ngOnInit(): void {
        this.recordModel = {};
        console.log('')
    }

    ngDoCheck(): void {
        if(this.formManager.getService()){
            this.recordModel = this.formManager.getRecordModel();
        }
    }

    onSubmit(): void {
        console.log(`adding ${this.formManager.getService()} record `, this.recordModel);
        this[this.formManager.getService()].addRecord(this.recordModel);
        this.recordModel = this.formManager.getRecordModel();
    }


}