import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PrivateRoutingModule } from "./private-routing.module";
import { ImageServices } from "../../services/image.services";
import { httpInterceptorProviders } from "../../services/interceptors/http-interceptors";
import { UserServices } from "../../services/user.services";
import { FormsModule } from "@angular/forms";
import { AccountServices } from "../../services/account.services";
import { PermissionServices } from "../../services/permission.services";
import { CompInitService } from "../../services/comp-init.service";
import { SetMessageService } from "../../services/setMessage.service";
import { AdminDomainModule } from "./admin-domain/admin-domain.module";
import { UserDomainModule } from "./user-domain/user-domain.module";
import { ServiceFormManagerService } from "../../services/service-form-manager.service";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        PrivateRoutingModule,
        AdminDomainModule,
        UserDomainModule
    ],
    declarations: [
    ],
    exports: [
    ],
    providers: [
        PermissionServices,
        AccountServices,
        UserServices,
        ImageServices,
        CompInitService,
        SetMessageService,
        ServiceFormManagerService,
        httpInterceptorProviders,
    ]
})

export class PrivateModule {}