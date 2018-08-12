import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SidebarComponent } from "./sidebar.component";
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
        SidebarComponent
    ],
    exports: [
        SidebarComponent
    ],
    providers: [
        ServiceModelManagerService,
        PermissionServices,
        AccountServices,
        UserServices,
        ImageServices,
    ]
})

export class SidebarModule {}