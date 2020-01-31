import { Component, DoCheck, OnInit, ViewEncapsulation, HostListener } from "@angular/core";
import { AuthenticationServices } from "../../../services/authentication.services";
import { ServiceModelManagerServices } from "../../../services/service-model-manager.services";

const $ = require('jquery');

@Component({
    selector: 'app-user-domain',
    template: require('./user-domain.component.pug'),
    styleUrls: ['./user-domain.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class UserDomainComponent implements OnInit, DoCheck {

    private recordModel: any;

    constructor(
        private activeUser: AuthenticationServices,
        private formManager: ServiceModelManagerServices
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
