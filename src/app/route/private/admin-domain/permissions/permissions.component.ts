import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { AuthenticationServices } from "../../../../services/authentication.services";
import { PermissionModel } from "../../../../models/permission.model";
import { ActivatedRoute } from "@angular/router";
import { ServiceModelManagerServices } from "../../../../services/service-model-manager.services";
import { PermissionServices } from "../../../../services/permission.services";

@Component({
    selector: 'app-permissions',
    template: require('./permissions.component.pug'),
    encapsulation: ViewEncapsulation.None
})

export class PermissionsComponent implements OnInit {

    private permissionForm: PermissionModel = new PermissionModel('uuid_generate_v4()');

    constructor(
        private permissionService: PermissionServices,
        private formManager: ServiceModelManagerServices,
        private activatedRoute: ActivatedRoute,
        private activeUser: AuthenticationServices
    ){}

    ngOnInit(): void {
        this.formManager.setService(this.activatedRoute.snapshot.url[0].path);
    }

    delete(permission_id: string): void {
        this.permissionService.deleteRecord(permission_id);
    }
}