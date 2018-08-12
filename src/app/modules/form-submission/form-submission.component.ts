import {
    Component, OnInit, ViewEncapsulation, DoCheck
} from "@angular/core";
import { AuthenticationService } from "../../services/authentication.service";
import { UserServices } from "../../services/user.services";
import { AccountServices } from "../../services/account.services";
import { PermissionServices } from "../../services/permission.services";
import { ServiceModelManagerService } from "../../services/service-model-manager.service";


@Component({
    selector: 'app-form-submission',
    template: require('./form-submission.component.pug'),
    encapsulation: ViewEncapsulation.None
})

export class FormSubmissionComponent implements OnInit, DoCheck {

    recordModel: any;

    constructor(private formManager: ServiceModelManagerService, private users: UserServices, private accounts: AccountServices, private permissions: PermissionServices, private activeUser: AuthenticationService) {}

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