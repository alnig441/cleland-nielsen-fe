import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { PermissionServices } from "../../services/permission.services";
import { HttpAuthService } from "../../services/httpAuth.service";
import { PermissionModel } from "../../models/permission.model";

@Component({
    selector: 'app-permissions-panel',
    template: require('./permissionsPanel.component.pug'),
    encapsulation: ViewEncapsulation.None
})

export class PermissionsPanelComponent implements OnInit {

    constructor(private activeUser: HttpAuthService, private permissionService: PermissionServices){}

    ngOnInit(): void {
        this.permissionService.getAll()
            .catch((error: any ) => {
                this.permissionService.error = error;
                setTimeout(() => {
                    this.permissionService.error = null;
                }, 3000)
            })
        // console.log('permPanel comp init', this.activeUser.isPermitted);
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