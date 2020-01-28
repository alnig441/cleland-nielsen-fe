import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PrivateRoutingModule } from "./private-routing.module";
import { MongoImageServices } from "../../services/mongoImage.services";
import { MongoVideoServices } from "../../services/mongoVideo.services";
import { httpInterceptorProviders } from "../../services/interceptors/http-interceptors";
import { UserServices } from "../../services/user.services";
import { FormsModule } from "@angular/forms";
import { AccountServices } from "../../services/account.services";
import { PermissionServices } from "../../services/permission.services";
import { AppAlertsServices } from "../../services/app-alerts.services";
import { AdminDomainModule } from "./admin-domain/admin-domain.module";
import { UserDomainModule } from "./user-domain/user-domain.module";
import { ServiceModelManagerServices } from "../../services/service-model-manager.services";
import { AppEditorServices } from "../../services/app-editor.services";
import { AppModalServices } from "../../services/app-modal.services";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        PrivateRoutingModule,
        AdminDomainModule,
        UserDomainModule,
    ],
    declarations: [
    ],
    exports: [
    ],
    providers: [
        PermissionServices,
        AccountServices,
        UserServices,
        MongoImageServices,
        MongoVideoServices,
        AppAlertsServices,
        ServiceModelManagerServices,
        AppEditorServices,
        AppModalServices,
        httpInterceptorProviders,
    ]
})

export class PrivateModule {}
