import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import {HttpAuthService} from "../../../services/httpAuth.service";

@Component({
    selector: 'app-events',
    template: require('./events.component.pug'),
    encapsulation: ViewEncapsulation.None
})

export class EventsComponent implements OnInit {

    constructor(private activeUser: HttpAuthService){}

    ngOnInit(): void {
        console.log('events comp init', this.activeUser.isPermitted);
    }
}