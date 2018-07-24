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

    constructor(private users: UserServices) {}

    ngOnInit(): void {
        console.log('panel comp init');
    }

    edit(user: UserModel): void {
        console.log('editing user: ', user.user_name);
    }

    delete(user: UserModel): void {
        console.log('deleting user: ', user.user_name);
    }
}