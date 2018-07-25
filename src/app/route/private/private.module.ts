import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminComponent } from "./admin/admin.component";
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
import {AccountServices} from "../../services/account.services";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        PrivateRoutingModule
    ],
    declarations: [
        AdminComponent,
        UsersComponent,
        EventsComponent,
        ImagesComponent,
        SidebarComponent,
        InfobarComponent,
        ThumbnailComponent,
        MessagebarComponent,
        PanelComponent
    ],
    exports: [
    ],
    providers: [
        ImageServices,
        UserServices,
        AccountServices,
        httpInterceptorProviders,
    ]
})

export class PrivateModule {}