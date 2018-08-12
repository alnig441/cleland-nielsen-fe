import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserDomainRoutingModule } from "./user-domain-routing.module";
import { VideosComponent } from "./videos/videos.component";
import { RouterModule } from "@angular/router";
import { AuthGuardService } from "../../../services/auth-guard.service";
import { ImagesComponent } from "./images/images.component";
import { UserDomainComponent } from "./user-domain.component";
import { MessageBarModule } from "../../../modules/message-bar/message-bar.module";
import { SidebarModule } from "../../../modules/sidebar/sidebar.module";

@NgModule({
    imports: [
        CommonModule,
        UserDomainRoutingModule,
        MessageBarModule,
        SidebarModule
    ],
    declarations: [
        UserDomainComponent,
        ImagesComponent,
        VideosComponent,
    ],
    exports: [ RouterModule ],
    providers: [ AuthGuardService ]
})

export class UserDomainModule {}