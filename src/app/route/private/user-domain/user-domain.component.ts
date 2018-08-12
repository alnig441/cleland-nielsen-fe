import { Component, DoCheck, OnInit, ViewEncapsulation } from "@angular/core";
import { HttpAuthService } from "../../../services/httpAuth.service";
import { SetMessageService } from "../../../services/setMessage.service";
import { ServiceModelManagerService } from "../../../services/service-model-manager.service";
import { ImageServices } from "../../../services/image.services";

@Component({
    selector: 'app-user-domain',
    template: require('./user-domain.component.pug'),
    encapsulation: ViewEncapsulation.None
})

export class UserDomainComponent implements OnInit, DoCheck {

    private recordModel: any;

    constructor(private activeUser: HttpAuthService, private setMessage: SetMessageService, private formManager: ServiceModelManagerService, private images: ImageServices){}

    ngOnInit(): void {
        this.images.getAll();
    }

    ngDoCheck(): void {
        if(this.formManager.getService()){
            this.recordModel = this.formManager.getRecordModel();
        }
    }

    getLatest() {
        console.log('get latest');
    }

    getList() {
        console.log('get list');
    }
}