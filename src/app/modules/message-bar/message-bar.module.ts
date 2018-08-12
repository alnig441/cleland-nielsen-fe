import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MessagebarComponent } from "../../components/messagebar/messagebar.component";
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
        ServiceModelManagerService
    ]
})

export class MessageBarModule {}