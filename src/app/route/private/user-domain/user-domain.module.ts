import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserDomainRoutingModule } from "./user-domain-routing.module";
import { VideosComponent } from "./videos/videos.component";
import { AuthenticationGuardService } from "../../../services/authentication-guard.service";
import { ImagesComponent } from "./images/images.component";
import { UserDomainComponent } from "./user-domain.component";
import { MessageBarModule } from "../../../modules/message-bar/message-bar.module";
import { SidebarCtaModule } from "../../../modules/sidebar-cta/sidebar-cta.module";
import { FormSubmissionModule } from "../../../modules/form-submission/form-submission.module";
import { MonthTransform } from "../../../pipes/month.transform";

@NgModule({
    imports: [
        CommonModule,
        UserDomainRoutingModule,
        MessageBarModule,
        SidebarCtaModule,
        FormSubmissionModule,
    ],
    declarations: [
        UserDomainComponent,
        ImagesComponent,
        VideosComponent,
        MonthTransform
    ],
    exports: [ MonthTransform ],
    providers: [ AuthenticationGuardService ]
})

export class UserDomainModule {}