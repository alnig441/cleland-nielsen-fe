import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { AuthenticationService } from "../../../../services/authentication.service";
import {ServiceModelManagerService} from "../../../../services/service-model-manager.service";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-events',
    template: require('./videos.component.pug'),
    encapsulation: ViewEncapsulation.None
})

export class VideosComponent implements OnInit {

    constructor(private formManager: ServiceModelManagerService, private activeUser: AuthenticationService, private activatedRoute: ActivatedRoute){}

    ngOnInit(): void {
        console.log('events comp init', this.activeUser.isPermitted);
        this.formManager.setService(this.activatedRoute.snapshot.url[0].path);
    }
}