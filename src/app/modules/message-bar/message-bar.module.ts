import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MessagebarComponent } from "./message-bar.component";
import { SetMessageService } from "../../services/set-message.service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
    imports: [
        CommonModule,
        BrowserAnimationsModule
    ],
    declarations: [
        MessagebarComponent
    ],
    exports: [
        MessagebarComponent
    ],
    providers: [
        SetMessageService,
    ]
})

export class MessageBarModule {}