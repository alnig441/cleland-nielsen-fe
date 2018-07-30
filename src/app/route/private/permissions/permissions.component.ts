import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { HttpAuthService } from "../../../services/httpAuth.service";

@Component({
    selector: 'app-permissions',
    template: require('./permissions.component.pug'),
    encapsulation: ViewEncapsulation.None
})

export class PermissionsComponent implements OnInit {

    constructor(private activeUser: HttpAuthService){}

    ngOnInit(): void {
        console.log('permissions comp init', this.activeUser.isPermitted);
    }
}