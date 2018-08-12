import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { HttpAuthService } from "../../../../services/http-authentication.service";

@Component({
    selector: 'app-events',
    template: require('./videos.component.pug'),
    encapsulation: ViewEncapsulation.None
})

export class VideosComponent implements OnInit {

    constructor(private activeUser: HttpAuthService){}

    ngOnInit(): void {
        console.log('events comp init', this.activeUser.isPermitted);
    }
}