import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { UserServices } from "../../services/user.services";
import { UserModel } from "../../models/user.model";

@Component({
    selector: 'app-panel',
    template: require('./panel.component.pug'),
    styleUrls: ['./panel.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class PanelComponent implements OnInit {

    doEdit = {};
    disabled: boolean;

    constructor(private users: UserServices) {}

    ngOnInit(): void {
        console.log('panel comp init');
    }

    edit(user: UserModel): void {
        console.log('editing user: ', user.user_name);
        this.doEdit[user.user_name] = true;

    }

    done(user: UserModel): void {
        console.log('done editing user: ', user);
        this.doEdit = {};
    }

    delete(user: UserModel): void {
        console.log('deleting user: ', user.user_name);
    }
}