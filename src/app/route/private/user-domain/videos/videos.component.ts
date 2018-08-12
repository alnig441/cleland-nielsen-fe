import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { AuthenticationService } from "../../../../services/authentication.service";

@Component({
    selector: 'app-events',
    template: require('./videos.component.pug'),
    encapsulation: ViewEncapsulation.None
})

export class VideosComponent implements OnInit {

    constructor(private activeUser: AuthenticationService){}

    ngOnInit(): void {
        console.log('events comp init', this.activeUser.isPermitted);
    }
}