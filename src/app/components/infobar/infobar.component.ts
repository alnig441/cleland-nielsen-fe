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

    itemForm: any;

    constructor(private formManager: ServiceFormManagerService, private users: UserServices, private accounts: AccountServices, private permissions: PermissionServices, private activeUser: HttpAuthService) {}

    ngOnInit(): void {
        this.itemForm = {};
    }

    ngDoCheck(): void {
        if(this.formManager.getService()){
            this.itemForm = this.formManager.getItemForm();
        }
    }

    onSubmit(): void {
        this[this.formManager.getService()].addItem(this.itemForm)

    }


}