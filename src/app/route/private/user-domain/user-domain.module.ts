import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { UserDomainRoutingModule } from "./user-domain-routing.module";
import { MessageBarModule } from "../../../modules/message-bar/message-bar.module";
import { SidebarCtaModule } from "../../../modules/sidebar-cta/sidebar-cta.module";
import { FormSubmissionModule } from "../../../modules/form-submission/form-submission.module";
import { PipesModule } from "../../../pipes/pipes.module";

import { VideosComponent } from "./videos/videos.component";
import { ImagesComponent } from "./images/images.component";
import { UserDomainComponent } from "./user-domain.component";

import { InfoboxDirective } from "../../../directives/infobox.directive";
import { ModalImageDirective } from "../../../directives/modalImage.directive";
import { ModalVideoDirective } from "../../../directives/modalVideo.directive";
import { ImageEditorDirective } from "../../../directives/image-editor.directive";
import { StopPropagationOnClick } from "../../../directives/stop-propagation-on-click.directive";
import { DestroyVideoOnEnded } from "../../../directives/destroy-video-on-ended.directive";

import { AuthenticationGuardService } from "../../../services/authentication-guard.service";

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      UserDomainRoutingModule,
      MessageBarModule,
      SidebarCtaModule,
      FormSubmissionModule,
      PipesModule
    ],
    declarations: [
      UserDomainComponent,
      ImagesComponent,
      VideosComponent,
      ModalImageDirective,
      ModalVideoDirective,
      InfoboxDirective,
      ImageEditorDirective,
      StopPropagationOnClick,
      DestroyVideoOnEnded
    ],
    exports: [
    ],
    providers: [
      AuthenticationGuardService
    ]
})

export class UserDomainModule {}
