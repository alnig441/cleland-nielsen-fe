import { Component, OnInit, ViewEncapsulation } from "@angular/core";

@Component({
    selector: 'app-users',
    template: require('./users.component.pug'),
    encapsulation: ViewEncapsulation.None
})

export class UsersComponent implements OnInit {

    constructor() {}

    ngOnInit(): void {
        console.log('user comp init');
    }
}