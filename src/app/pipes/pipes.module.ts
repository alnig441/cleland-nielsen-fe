import { NgModule } from "@angular/core";

import { LabelTransform } from "./label.transform";
import { DayTransform } from "./day.transform";
import { MonthTransform } from "./month.transform";
import { ExtTransform } from "./ext.transform";
import { UuidTransformPipe } from './uuid.transform';
import { ValueTransform } from './value.transform';

@NgModule({
    imports: [
    ],
    declarations: [
      LabelTransform,
      DayTransform,
      MonthTransform,
      ExtTransform,
      UuidTransformPipe,
      ValueTransform
    ],
    exports: [
      LabelTransform,
      DayTransform,
      MonthTransform,
      ExtTransform,
      UuidTransformPipe,
      ValueTransform
    ],
    providers: [  ]
})

export class PipesModule {}
