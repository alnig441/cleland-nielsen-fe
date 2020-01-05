import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { SearchFieldComponent } from "./search-field.component";

import { AppDirectivesModule } from "../../modules/app-directives/app-directives.module";

import { MongoImageServices} from "../../services/mongoImage.services";

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    AppDirectivesModule,
  ],
  declarations: [
    SearchFieldComponent,
  ],
  exports: [
    SearchFieldComponent
  ],
  providers: [
    MongoImageServices
  ]
})

export class SearchFieldModule {}