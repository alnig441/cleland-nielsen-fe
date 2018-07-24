import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import {UsersServices} from "../../../services/users.services";

@Component({
    selector: 'app-users',
    template: require('./users.component.pug'),
    encapsulation: ViewEncapsulation.None
})

export class UsersComponent implements OnInit {

    constructor(private users: UsersServices) {}

    ngOnInit(): void {
        console.log('user comp init');
    }
}