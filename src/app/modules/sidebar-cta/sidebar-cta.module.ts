import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SidebarCtaComponent } from "./sidebar-cta.component";
import { ServiceModelManagerService } from "../../services/service-model-manager.service";
import { PermissionServices } from "../../services/permission.services";
import { AccountServices } from "../../services/account.services";
import { UserServices } from "../../services/user.services";
import { ImageServices } from "../../services/image.services";

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
        ServiceModelManagerService,
        PermissionServices,
        AccountServices,
        UserServices,
        ImageServices,
    ]
})

export class SidebarCtaModule {}