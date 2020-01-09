import { NgModule } from "@angular/core";

import { LabelTransform } from "./label.transform";
import { DayTransform } from "./day.transform";
import { MonthTransform } from "./month.transform";
import { ExtTransform } from "./ext.transform";
import { UuidTransformPipe } from './uuid.transform';
import { ValueTransform } from './value.transform';
import { KeyvalueTransform } from './keyvalue.transform.ts';

@NgModule({
    imports: [
    ],
    declarations: [
      LabelTransform,
      DayTransform,
      MonthTransform,
      ExtTransform,
      UuidTransformPipe,
      ValueTransform,
      KeyvalueTransform
    ],
    exports: [
      LabelTransform,
      DayTransform,
      MonthTransform,
      ExtTransform,
      UuidTransformPipe,
      ValueTransform,
      KeyvalueTransform
    ],
    providers: [  ]
})

export class PipesModule {}
