import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppModalDirective } from "../../directives/app-modal.directive";
import { InfoboxDirective } from "../../directives/infobox.directive";
import { DestroyVideoOnEnded } from "../../directives/destroy-video-on-ended.directive";
import { StopPropagationOnClick } from "../../directives/stop-propagation-on-click.directive";
import { ImageEditorDirective } from "../../directives/image-editor.directive";
import { AppVideoModalDirective } from "../../directives/app-video-modal.directive";

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    AppModalDirective,
    InfoboxDirective,
    DestroyVideoOnEnded,
    StopPropagationOnClick,
    ImageEditorDirective,
    AppVideoModalDirective
  ],
  exports: [
    AppModalDirective,
    InfoboxDirective,
    DestroyVideoOnEnded,
    StopPropagationOnClick,
    ImageEditorDirective,
    AppVideoModalDirective
  ],
  providers: [
  ]
})

export class AppDirectivesModule {}