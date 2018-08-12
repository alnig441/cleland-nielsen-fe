import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminDomainRoutingModule } from "./admin-domain-routing.module";
import { AdminDomainComponent } from "./admin-domain.component";
import { UsersComponent } from "./users/users.component";
import { AccountsComponent } from "./accounts/accounts.component";
import { PermissionsComponent } from "./permissions/permissions.component";
import { FormsModule } from "@angular/forms";
import { UuidTransformPipe } from "../../../pipes/uuid.transform";
import { SidebarComponent } from "../../../components/sidebar/sidebar.component";
import { InfobarComponent } from "../../../components/infobar/infobar.component";
import { MessageBarModule } from "../../../modules/message-bar/message-bar.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        AdminDomainRoutingModule,
        MessageBarModule
    ],
    declarations: [
        SidebarComponent,
        InfobarComponent,
        AdminDomainComponent,
        UsersComponent,
        AccountsComponent,
        PermissionsComponent,
        UuidTransformPipe,
    ],
    exports: [ UuidTransformPipe ],
    providers: []
})

export class AdminDomainModule {}