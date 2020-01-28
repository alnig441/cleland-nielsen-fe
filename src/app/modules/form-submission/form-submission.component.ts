import { Component, OnInit, ViewEncapsulation, DoCheck } from "@angular/core";
import { AuthenticationServices } from "../../services/authentication.services";
import { UserServices } from "../../services/user.services";
import { AccountServices } from "../../services/account.services";
import { PermissionServices } from "../../services/permission.services";
import { ServiceModelManagerServices } from "../../services/service-model-manager.services";


@Component({
    selector: 'app-form-submission',
    template: require('./form-submission.component.pug'),
    encapsulation: ViewEncapsulation.None
})

export class FormSubmissionComponent implements OnInit, DoCheck {

    recordModel: any;

    constructor(
        private formManager: ServiceModelManagerServices,
        private users: UserServices,
        private accounts: AccountServices,
        private permissions: PermissionServices,
        private activeUser: AuthenticationServices
    ) {}

    ngOnInit(): void {
        this.recordModel = {};
    }

    ngDoCheck(): void {
        if(this.formManager.getService()){
            this.recordModel = this.formManager.getRecordModel();
        }
    }

    onSubmit(): void {
        this[this.formManager.getService()].addRecord(this.recordModel)
            .then(()=> {
                this.formManager.initializeRecordModel();
            })
    }


}
