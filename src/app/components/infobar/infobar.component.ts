import { Component, OnInit, ViewEncapsulation } from "@angular/core";

@Component({
    selector: 'app-infobar',
    template: require('./infobar.component.pug'),
    encapsulation: ViewEncapsulation.None
})

export class InfobarComponent implements OnInit {

    constructor() {}

    ngOnInit(): void {
        console.log('infobar comp init');

    }

}