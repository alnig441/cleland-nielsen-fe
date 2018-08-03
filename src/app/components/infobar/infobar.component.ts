import { Component, OnInit, ViewEncapsulation, Input, DoCheck } from "@angular/core";
import { HttpAuthService } from "../../services/httpAuth.service";
import { UserServices } from "../../services/user.services";
import { AccountServices } from "../../services/account.services";
import { PermissionServices } from "../../services/permission.services";
import {PermissionModel} from "../../models/permission.model";
import {UserModel} from "../../models/user.model";
import {AccountModel} from "../../models/account.model";

@Component({
    selector: 'app-infobar',
    template: require('./infobar.component.pug'),
    encapsulation: ViewEncapsulation.None
})

export class InfobarComponent implements OnInit, DoCheck {

    @Input() itemForm: any;
    @Input() type: string;

    private formProperties: string[];
    private languages = [
        { language: 'english'},
        { language: 'danish'}
    ]

    constructor(private user: UserServices, private account: AccountServices, private permission: PermissionServices, private activeUser: HttpAuthService) {}

    ngOnInit(): void {
        console.log('infobar comp init');

        if(this.itemForm){
            this.formProperties = Object.keys(this.itemForm);
            this.itemForm.account_permissions = new Array();
        }
    }

    ngDoCheck(): void {
        if(this.itemForm){
            this.formProperties = Object.keys(this.itemForm);
        }

    }

    onSubmit(): void {
        let _id = 'uuid_generate_v4()';

        console.log(`adding ${this.type}`, this.itemForm);

        this[this.type].addItem(this.itemForm)

        switch (this.type) {
            case 'permission':
                this.itemForm = new PermissionModel(_id);
                break;
            case 'user':
                this.itemForm = new UserModel(_id);
                break;
            case 'account':
                this.itemForm = new AccountModel(_id);
                break;
        }
    }

}