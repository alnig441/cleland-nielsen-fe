import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SearchFieldComponent } from "./search-field.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule
  ],
  declarations: [
    SearchFieldComponent
  ],
  exports: [
    SearchFieldComponent
  ],
  providers: [
  ]
})

export class SearchFieldModule {}