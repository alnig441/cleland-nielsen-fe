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
import { SetMessageService } from "../../services/set-message.service";
import { AdminDomainModule } from "./admin-domain/admin-domain.module";
import { UserDomainModule } from "./user-domain/user-domain.module";
import { ServiceModelManagerService } from "../../services/service-model-manager.service";

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
        SetMessageService,
        ServiceModelManagerService,
        httpInterceptorProviders,
    ]
})

export class PrivateModule {}
