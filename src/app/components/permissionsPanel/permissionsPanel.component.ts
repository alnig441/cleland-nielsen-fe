import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { PermissionServices } from "../../services/permission.services";
import { HttpAuthService } from "../../services/httpAuth.service";
import { PermissionModel } from "../../models/permission.model";
import {CompInitService} from "../../services/comp-init.service";

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

    delete(permission: PermissionModel): void {

        console.log(`deleting: `, permission);
        this.permissionService.deleteItem()
            .catch((error: any) => {
                this.permissionService.error = error;
                setTimeout(() => {
                    this.permissionService.error = null;
                },3000)
            })

        }

}