import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { PipesModule } from "../../pipes/pipes.module";
import { AppDirectivesModule } from "../app-directives/app-directives.module";

import { AppEditorComponent } from "./app-editor.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PipesModule,
    AppDirectivesModule
  ],
  declarations: [
    AppEditorComponent
  ],
  exports: [
    AppEditorComponent
  ],
  providers: [
  ]
})

export class AppEditorModule {}
