import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { HttpAuthService } from "../../../services/httpAuth.service";
import { SetMessageService } from "../../../services/setMessage.service";
import { ServiceFormManagerService } from "../../../services/service-form-manager.service";
import { ImageServices } from "../../../services/image.services";

@Component({
    selector: 'app-user-domain',
    template: require('./user-domain.component.pug'),
    encapsulation: ViewEncapsulation.None
})

export class UserDomainComponent implements OnInit {

    private itemForm: any;

    constructor(private activeUser: HttpAuthService, private setMessage: SetMessageService, private formManager: ServiceFormManagerService, private images: ImageServices){}

    ngOnInit(): void {
        console.log('user-domain comp initialized');
        this.itemForm = {};
        // this.formManager.setService('images');
        // this.itemForm = this.formManager.getItemForm();
    }

    getLatest() {
        console.log('get latest');
    }

    getList() {
        console.log('get list');
    }
}