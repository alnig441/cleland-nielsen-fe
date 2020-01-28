import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SidebarCtaComponent } from "./sidebar-cta.component";
import { ServiceModelManagerServices } from "../../services/service-model-manager.services";
import { PermissionServices } from "../../services/permission.services";
import { AccountServices } from "../../services/account.services";
import { UserServices } from "../../services/user.services";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        SidebarCtaComponent
    ],
    exports: [
        SidebarCtaComponent
    ],
    providers: [
        ServiceModelManagerServices,
        PermissionServices,
        AccountServices,
        UserServices,
    ]
})

export class SidebarCtaModule {}
