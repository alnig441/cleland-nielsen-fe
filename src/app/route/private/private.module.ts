import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PrivateRoutingModule } from "./private-routing.module";
import { UsersComponent } from "./users/users.component";
import { EventsComponent } from "./events/events.component";
import { ImagesComponent } from "./images/images.component";
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { ImageServices } from "../../services/image.services";
import { InfobarComponent } from "../../components/infobar/infobar.component";
import { ThumbnailComponent } from "../../components/thumbnail/thumbnail.component";
import { httpInterceptorProviders } from "../../services/interceptors/http-interceptors";
import { MessagebarComponent } from "../../components/messagebar/messagebar.component";
import { UserServices } from "../../services/user.services";
import { PanelComponent } from "../../components/panel/panel.component";
import { FormsModule } from "@angular/forms";
import { AccountServices } from "../../services/account.services";
import { AccountsComponent } from "./accounts/accounts.component";
import { PermissionsComponent } from "./permissions/permissions.component";
import { PermissionServices } from "../../services/permission.services";
import { PermissionsPanelComponent } from "../../components/permissionsPanel/permissionsPanel.component";
import { AccountsPanelComponent } from "../../components/accountsPanel/accountsPanel.component";
import { UuidTransformPipe } from "../../pipes/uuid.transform";
import {ErrorParserService} from "../../services/error-parser.service";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        PrivateRoutingModule
    ],
    declarations: [
        UsersComponent,
        EventsComponent,
        ImagesComponent,
        SidebarComponent,
        InfobarComponent,
        ThumbnailComponent,
        MessagebarComponent,
        PanelComponent,
        AccountsComponent,
        PermissionsComponent,
        PermissionsPanelComponent,
        AccountsPanelComponent,
        UuidTransformPipe,
    ],
    exports: [
        UuidTransformPipe
    ],
    providers: [
        ErrorParserService,
        PermissionServices,
        AccountServices,
        UserServices,
        ImageServices,
        httpInterceptorProviders,
    ]
})

export class PrivateModule {}