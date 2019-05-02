import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminDomainRoutingModule } from "./admin-domain-routing.module";
import { AdminDomainComponent } from "./admin-domain.component";
import { UsersComponent } from "./users/users.component";
import { AccountsComponent } from "./accounts/accounts.component";
import { PermissionsComponent } from "./permissions/permissions.component";
import { FormsModule } from "@angular/forms";
import { MessageBarModule } from "../../../modules/message-bar/message-bar.module";
import { SidebarCtaModule } from "../../../modules/sidebar-cta/sidebar-cta.module";
import { FormSubmissionModule } from "../../../modules/form-submission/form-submission.module";
import { PipesModule } from "../../../pipes/pipes.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        AdminDomainRoutingModule,
        MessageBarModule,
        SidebarCtaModule,
        FormSubmissionModule,
        PipesModule
    ],
    declarations: [
        AdminDomainComponent,
        UsersComponent,
        AccountsComponent,
        PermissionsComponent,
    ],
    exports: [
    ],
    providers: []
})

export class AdminDomainModule {}
