import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { UserDomainRoutingModule } from "./user-domain-routing.module";
import { MessageBarModule } from "../../../modules/message-bar/message-bar.module";
import { SidebarCtaModule } from "../../../modules/sidebar-cta/sidebar-cta.module";
import { FormSubmissionModule } from "../../../modules/form-submission/form-submission.module";
import { PipesModule } from "../../../pipes/pipes.module";
import { SearchFieldModule } from '../../../modules/search-field/search-field.module';
import { AppDirectivesModule } from "../../../modules/app-directives/app-directives.module";
import { AppModalModule } from "../../../modules/app-modal/app-modal.module";
import { AppEditorModule } from "../../../modules/app-editor/app-editor.module";

import { VideosComponent } from "./videos/videos.component";
import { ImagesComponent } from "./images/images.component";
import { UserDomainComponent } from "./user-domain.component";

import { AuthenticationGuardService } from "../../../services/authentication-guard.service";

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      UserDomainRoutingModule,
      MessageBarModule,
      SidebarCtaModule,
      FormSubmissionModule,
      PipesModule,
      SearchFieldModule,
      AppDirectivesModule,
      AppModalModule,
      AppEditorModule
    ],
    declarations: [
      UserDomainComponent,
      ImagesComponent,
      VideosComponent,
    ],
    exports: [
    ],
    providers: [
      AuthenticationGuardService
    ]
})

export class UserDomainModule {}
