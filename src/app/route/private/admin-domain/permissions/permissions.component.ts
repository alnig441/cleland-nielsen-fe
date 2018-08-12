import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { HttpAuthService } from "../../../../services/http-authentication.service";
import { PermissionModel } from "../../../../models/permission.model";
import { ActivatedRoute } from "@angular/router";
import { ServiceModelManagerService } from "../../../../services/service-model-manager.service";
import { PermissionServices } from "../../../../services/permission.services";

@Component({
    selector: 'app-permissions',
    template: require('./permissions.component.pug'),
    encapsulation: ViewEncapsulation.None
})

export class PermissionsComponent implements OnInit {

    private permissionForm: PermissionModel = new PermissionModel('uuid_generate_v4()');

    constructor( private permissionService: PermissionServices, private formManager: ServiceModelManagerService, private activatedRoute: ActivatedRoute, private activeUser: HttpAuthService){}

    ngOnInit(): void {
        this.formManager.setService(this.activatedRoute.snapshot.url[0].path);
    }

    delete(permission_id: string): void {
        console.log('deleting permission: ', permission_id);
        this.permissionService.deleteRecord(permission_id);
    }
}