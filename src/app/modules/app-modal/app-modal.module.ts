import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AppDirectivesModule } from "../../modules/app-directives/app-directives.module";
import { PipesModule } from "../../pipes/pipes.module";

import { AppModalComponent } from "./app-modal.component";

import { AuthenticationServices } from "../../services/authentication.services";
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
    AuthenticationServices,
    MongoImageServices
  ]
})

export class AppModalModule {}