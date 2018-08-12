import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserDomainRoutingModule } from "./user-domain-routing.module";
import { VideosComponent } from "./videos/videos.component";
import { RouterModule } from "@angular/router";
import { AuthGuardService } from "../../../services/auth-guard.service";
import { ImagesComponent } from "./images/images.component";
import { UserDomainComponent } from "./user-domain.component";

@NgModule({
    imports: [
        CommonModule,
        UserDomainRoutingModule,
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