import { NgModule } from "@angular/core";
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { MessagebarComponent } from "../../components/messagebar/messagebar.component";
import { InfobarComponent } from "../../components/infobar/infobar.component";
import { SetMessageService } from "../../services/setMessage.service";
import { ServiceFormManagerService } from "../../services/service-form-manager.service";
import { PermissionServices } from "../../services/permission.services";
import { AccountServices } from "../../services/account.services";
import { UserServices } from "../../services/user.services";
import { ImageServices } from "../../services/image.services";

@NgModule({
    imports: [
    ],
    declarations: [
        SidebarComponent,
        MessagebarComponent,
        InfobarComponent
    ],
    exports: [
        SidebarComponent,
        MessagebarComponent,
        InfobarComponent
    ],
    providers: [
        PermissionServices,
        AccountServices,
        UserServices,
        ImageServices,
        SetMessageService,
        ServiceFormManagerService,

    ]
})

export class PrivateDistroModule {}