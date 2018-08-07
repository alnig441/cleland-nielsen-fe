import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { HttpAuthService } from "../../../../services/httpAuth.service";
import { PermissionModel } from "../../../../models/permission.model";

@Component({
    selector: 'app-permissions',
    template: require('./permissions.component.pug'),
    encapsulation: ViewEncapsulation.None
})

export class PermissionsComponent implements OnInit {

    private permissionForm: PermissionModel = new PermissionModel('uuid_generate_v4()');

    constructor(private activeUser: HttpAuthService){}

    ngOnInit(): void {
    }
}