import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MessagebarComponent } from "./message-bar.component";
import { SetMessageService } from "../../services/setMessage.service";
import { ServiceModelManagerService } from "../../services/service-model-manager.service";

@NgModule({
    imports: [
        CommonModule
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