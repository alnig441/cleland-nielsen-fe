import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { PermissionServices } from "../../services/permission.services";
import { HttpAuthService } from "../../services/httpAuth.service";
import { PermissionModel } from "../../models/permission.model";
import { CompInitService } from "../../services/comp-init.service";

@Component({
    selector: 'app-permissions-panel',
    template: require('./permissionsPanel.component.pug'),
    encapsulation: ViewEncapsulation.None
})

export class PermissionsPanelComponent implements OnInit {

    constructor(private compInit: CompInitService, private activeUser: HttpAuthService, private permissionService: PermissionServices){}

    ngOnInit(): void {
        if(this.activeUser.isPermitted['to_view_permissions']){
            this.compInit.initialize('permissions')
                .then((result: any) => {
                    console.log('permissions panel comp init ', result);
                })
        };
    }

    delete(permission_id: string): void {
        console.log(`deleting: `, permission_id);
        this.permissionService.deleteItem(permission_id)
        }

}