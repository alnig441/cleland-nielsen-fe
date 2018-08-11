import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { HttpAuthService } from "../../../../services/httpAuth.service";
import { PermissionModel } from "../../../../models/permission.model";
import { ActivatedRoute } from "@angular/router";
import { ServiceFormManagerService} from "../../../../services/service-form-manager.service";
import {PermissionServices} from "../../../../services/permission.services";
import {CompInitService} from "../../../../services/comp-init.service";

@Component({
    selector: 'app-permissions',
    template: require('./permissions.component.pug'),
    encapsulation: ViewEncapsulation.None
})

export class PermissionsComponent implements OnInit {

    private permissionForm: PermissionModel = new PermissionModel('uuid_generate_v4()');

    constructor(private compInit: CompInitService, private permissionService: PermissionServices, private formManager: ServiceFormManagerService, private activatedRoute: ActivatedRoute, private activeUser: HttpAuthService){}

    ngOnInit(): void {
        // console.log('permisson comp init: ', this.activatedRoute.snapshot.url[0].path);
        this.formManager.setService(this.activatedRoute.snapshot.url[0].path);
        if(this.activeUser.isPermitted['to_view_permissions']){
            this.compInit.initialize('permissions')
                .then((result: any) => {
                    console.log('permissions comp init: ', result);
                })
        }
    }

    delete(permission_id: string): void {
        console.log('deleting permission: ', permission_id);
        this.permissionService.deleteItem(permission_id);
    }
}