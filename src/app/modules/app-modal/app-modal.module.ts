import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AppDirectivesModule } from "../../modules/app-directives/app-directives.module";
import { PipesModule } from "../../pipes/pipes.module";

import { AppModalComponent } from "./app-modal.component";

import { AuthenticationService } from "../../services/authentication.service";
import { MongoImageServices} from "../../services/mongoImage.services";

@NgModule({
  imports: [
    CommonModule,
    AppDirectivesModule,
    PipesModule
  ],
  declarations: [
    AppModalComponent
  ],
  exports: [
    AppModalComponent
  ],
  providers: [
    AuthenticationService,
    MongoImageServices
  ]
})

export class AppModalModule {}