import { Component, OnInit, ViewEncapsulation } from "@angular/core";

@Component({
    selector: 'app-permissions',
    template: require('./permissions.component.pug'),
    encapsulation: ViewEncapsulation.None
})

export class PermissionsComponent implements OnInit {

    constructor(){}

    ngOnInit(): void {
        console.log('accounts comp init');
    }
}