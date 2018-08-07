import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PrivateRoutingModule } from "./private-routing.module";
import { UsersComponent } from "./admin-domain/users/users.component";
import { VideosComponent } from "./user-domain/videos/videos.component";
import { ImagesComponent } from "./user-domain/images/images.component";
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { ImageServices } from "../../services/image.services";
import { InfobarComponent } from "../../components/infobar/infobar.component";
import { httpInterceptorProviders } from "../../services/interceptors/http-interceptors";
import { MessagebarComponent } from "../../components/messagebar/messagebar.component";
import { UserServices } from "../../services/user.services";
import { FormsModule } from "@angular/forms";
import { AccountServices } from "../../services/account.services";
import { AccountsComponent } from "./admin-domain/accounts/accounts.component";
import { PermissionsComponent } from "./admin-domain/permissions/permissions.component";
import { PermissionServices } from "../../services/permission.services";
import { PermissionsPanelComponent } from "../../components/permissionsPanel/permissionsPanel.component";
import { AccountsPanelComponent } from "../../components/accountsPanel/accountsPanel.component";
import { UuidTransformPipe } from "../../pipes/uuid.transform";
import { UserPanelComponent } from "../../components/userPanel/user-panel.component";
import { ImagesThumbnailComponent } from "../../components/imagesThumbnail/images-thumbnail.component";
import { CompInitService } from "../../services/comp-init.service";
import { SetMessageService } from "../../services/setMessage.service";
import { AdminDomainModule } from "./admin-domain/admin-domain.module";
import { AdminDomainRoutingModule } from "./admin-domain/admin-domain-routing.module";
import { PrivateComponent } from "./private.component";
import { UserDomainModule } from "./user-domain/user-domain.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        PrivateRoutingModule,
        AdminDomainModule,
        UserDomainModule
    ],
    declarations: [
        // PrivateComponent,
        // UsersComponent,
        // EventsComponent,
        // ImagesComponent,
        // AccountsComponent,
        // PermissionsComponent,
        // SidebarComponent,
        // InfobarComponent,
        // MessagebarComponent,
        // ImagesThumbnailComponent,
        // UserPanelComponent,
        // AccountsPanelComponent,
        // PermissionsPanelComponent,
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
        CompInitService,
        SetMessageService,
        httpInterceptorProviders,
    ]
})

export class PrivateModule {}