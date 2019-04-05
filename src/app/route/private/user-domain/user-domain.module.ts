import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserDomainRoutingModule } from "./user-domain-routing.module";
import { MessageBarModule } from "../../../modules/message-bar/message-bar.module";
import { SidebarCtaModule } from "../../../modules/sidebar-cta/sidebar-cta.module";
import { FormSubmissionModule } from "../../../modules/form-submission/form-submission.module";

import { VideosComponent } from "./videos/videos.component";
import { ImagesComponent } from "./images/images.component";
import { UserDomainComponent } from "./user-domain.component";

import { MonthTransform } from "../../../pipes/month.transform";
import { KeyTransform } from "../../../pipes/key.transform";
import { ValueTransform } from "../../../pipes/value.transform";
import { ExtTransform } from "../../../pipes/ext.transform";
import { BtnTransform } from "../../../pipes/btn.transform";
import { DayTransform } from "../../../pipes/day.transform";

import { InfoboxDirective } from "../../../directives/infobox.directive";
import { ModalImageDirective } from "../../../directives/modalImage.directive";
import { ImageEditorDirective } from "../../../directives/image-editor.directive";

import { AuthenticationGuardService } from "../../../services/authentication-guard.service";

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
        MonthTransform,
        KeyTransform,
        ValueTransform,
        ExtTransform,
        BtnTransform,
        DayTransform,
        ModalImageDirective,
        InfoboxDirective,
        ImageEditorDirective
    ],
    exports: [ MonthTransform, KeyTransform, ValueTransform, ExtTransform, BtnTransform, DayTransform ],
    providers: [ AuthenticationGuardService ]
})

export class UserDomainModule {}
