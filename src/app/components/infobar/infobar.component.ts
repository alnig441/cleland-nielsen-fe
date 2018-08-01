import { Component, OnInit, ViewEncapsulation, Input, DoCheck } from "@angular/core";
import { HttpAuthService } from "../../services/httpAuth.service";
import { UserServices } from "../../services/user.services";
import { AccountServices } from "../../services/account.services";
import { PermissionServices } from "../../services/permission.services";

@Component({
    selector: 'app-infobar',
    template: require('./infobar.component.pug'),
    encapsulation: ViewEncapsulation.None
})

export class InfobarComponent implements OnInit, DoCheck {

    @Input() itemForm: any;
    @Input() type: string;

    private formProperties: string[];

    constructor(private user: UserServices, private account: AccountServices, private permission: PermissionServices, private activeUser: HttpAuthService) {}

    ngOnInit(): void {
        console.log('infobar comp init');

        if(this.itemForm){
            this.formProperties = Object.keys(this.itemForm);
            console.log('form props: ', this.formProperties);
        }
    }

    ngDoCheck(): void {
        if(this.itemForm){
            this.formProperties = Object.keys(this.itemForm);
            console.log('form props: ', this.formProperties);
        }

    }

    submit(form: any): void {
        console.log(`adding ${this.type}`, form);
        this[this.type].addItem()
            .catch((error: any) => {
                this[this.type].error = error;
                setTimeout(() => {
                    this[this.type].error = null;
                }, 3000)
            })
    }

}