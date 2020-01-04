import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppModalDirective } from "../../directives/app-modal.directive";
import { InfoboxDirective } from "../../directives/infobox.directive";
import { DestroyVideoOnEnded } from "../../directives/destroy-video-on-ended.directive";
import { StopPropagationOnClick } from "../../directives/stop-propagation-on-click.directive";
import { ImageEditorDirective } from "../../directives/image-editor.directive";

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    AppModalDirective,
    InfoboxDirective,
    DestroyVideoOnEnded,
    StopPropagationOnClick,
    ImageEditorDirective
  ],
  exports: [
    AppModalDirective,
    InfoboxDirective,
    DestroyVideoOnEnded,
    StopPropagationOnClick,
    ImageEditorDirective
  ],
  providers: [
  ]
})

export class AppDirectivesModule {}