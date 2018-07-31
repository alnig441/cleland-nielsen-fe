import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PrivateRoutingModule } from "./private-routing.module";
import { UsersComponent } from "./users/users.component";
import { EventsComponent } from "./events/events.component";
import { ImagesComponent } from "./images/images.component";
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { ImageServices } from "../../services/image.services";
import { InfobarComponent } from "../../components/infobar/infobar.component";
import { httpInterceptorProviders } from "../../services/interceptors/http-interceptors";
import { MessagebarComponent } from "../../components/messagebar/messagebar.component";
import { UserServices } from "../../services/user.services";
import { FormsModule } from "@angular/forms";
import { AccountServices } from "../../services/account.services";
import { AccountsComponent } from "./accounts/accounts.component";
import { PermissionsComponent } from "./permissions/permissions.component";
import { PermissionServices } from "../../services/permission.services";
import { PermissionsPanelComponent } from "../../components/permissionsPanel/permissionsPanel.component";
import { AccountsPanelComponent } from "../../components/accountsPanel/accountsPanel.component";
import { UuidTransformPipe } from "../../pipes/uuid.transform";
import { UserPanelComponent } from "../../components/userPanel/user-panel.component";
import { ImagesThumbnailComponent } from "../../components/imagesThumbnail/images-thumbnail.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        PrivateRoutingModule,
    ],
    declarations: [
        UsersComponent,
        EventsComponent,
        ImagesComponent,
        AccountsComponent,
        PermissionsComponent,
        SidebarComponent,
        InfobarComponent,
        MessagebarComponent,
        ImagesThumbnailComponent,
        UserPanelComponent,
        AccountsPanelComponent,
        PermissionsPanelComponent,
        UuidTransformPipe
    ],
    exports: [
        UuidTransformPipe
    ],
    providers: [
        PermissionServices,
        AccountServices,
        UserServices,
        ImageServices,
        httpInterceptorProviders,
    ]
})

export class PrivateModule {}