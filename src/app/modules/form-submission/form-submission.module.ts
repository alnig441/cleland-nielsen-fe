import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormSubmissionComponent } from "./form-submission.component";
import { ServiceModelManagerServices } from "../../services/service-model-manager.services";
import { UserServices } from "../../services/user.services";
import { AccountServices } from "../../services/account.services";
import { PermissionServices } from "../../services/permission.services";
import { FormsModule } from "@angular/forms";

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        FormSubmissionComponent
    ],
    exports: [
        FormSubmissionComponent
    ],
    providers: [
        ServiceModelManagerServices,
        UserServices,
        AccountServices,
        PermissionServices
    ]
})

export class FormSubmissionModule {}
