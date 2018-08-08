import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { HttpAuthService } from "../../../../services/httpAuth.service";
import { PermissionModel } from "../../../../models/permission.model";
import { ActivatedRoute } from "@angular/router";
import { ServiceFormManagerService} from "../../../../services/service-form-manager.service";

@Component({
    selector: 'app-permissions',
    template: require('./permissions.component.pug'),
    encapsulation: ViewEncapsulation.None
})

export class PermissionsComponent implements OnInit {

    private permissionForm: PermissionModel = new PermissionModel('uuid_generate_v4()');

    constructor(private urlSnapshot: ServiceFormManagerService, private activatedRoute: ActivatedRoute, private activeUser: HttpAuthService){}

    ngOnInit(): void {
        console.log('permisson comp init: ', this.activatedRoute.snapshot.url[0].path);
        this.urlSnapshot.setService(this.activatedRoute.snapshot.url[0].path);
    }
}