import { Component, DoCheck, OnInit, ViewEncapsulation, HostListener } from "@angular/core";
import { AuthenticationService } from "../../../services/authentication.service";
import { SetMessageService } from "../../../services/set-message.service";
import { ServiceModelManagerService } from "../../../services/service-model-manager.service";

@Component({
    selector: 'app-user-domain',
    template: require('./user-domain.component.pug'),
    styleUrls: ['./user-domain.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class UserDomainComponent implements OnInit, DoCheck {

    private recordModel: any;

    constructor(
        private activeUser: AuthenticationService,
        private setMessage: SetMessageService,
        private formManager: ServiceModelManagerService
    ){}

    ngOnInit(): void {}

    ngDoCheck(): void {
        if(this.formManager.getService()){
            this.recordModel = this.formManager.getRecordModel();
        }
    }

    getLatest() {
    }

    getList() {
    }
}
