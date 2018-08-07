import { Component, OnInit, ViewEncapsulation } from "@angular/core";

@Component({
    selector: 'app-user-domain',
    template: require('./user-domain.component.pug'),
    encapsulation: ViewEncapsulation.None
})

export class UserDomainComponent implements OnInit {

    constructor(){}

    ngOnInit(): void {
        console.log('user-domain comp initialized');
    }
}