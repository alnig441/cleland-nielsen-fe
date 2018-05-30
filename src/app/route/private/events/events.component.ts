import { Component, OnInit, ViewEncapsulation } from "@angular/core";

@Component({
    selector: 'app-events',
    template: require('./events.component.pug'),
    encapsulation: ViewEncapsulation.None
})

export class EventsComponent implements OnInit {

    constructor(){}

    ngOnInit(): void {
        console.log('events comp init');
    }
}