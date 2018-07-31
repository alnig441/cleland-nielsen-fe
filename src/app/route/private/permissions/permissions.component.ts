import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { HttpAuthService } from "../../../services/httpAuth.service";
import { PermissionModel } from "../../../models/permission.model";

@Component({
    selector: 'app-permissions',
    template: require('./permissions.component.pug'),
    encapsulation: ViewEncapsulation.None
})

export class PermissionsComponent implements OnInit {

    private permissionForm: PermissionModel = new PermissionModel('','')

    constructor(private activeUser: HttpAuthService){}

    ngOnInit(): void {
        // console.log('permissions comp init', this.activeUser.isPermitted);
    }
}