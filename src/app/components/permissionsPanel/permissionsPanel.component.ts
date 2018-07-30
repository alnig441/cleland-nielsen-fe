import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { PermissionServices } from "../../services/permission.services";

@Component({
    selector: 'app-permissions-panel',
    template: require('./permissionsPanel.component.pug'),
    encapsulation: ViewEncapsulation.None
})

export class PermissionsPanelComponent implements OnInit {

    constructor(private permissionService: PermissionServices){}

    ngOnInit(): void {
        // this.permissionService.getAll();
        console.log('permPanel comp init');
    }
}