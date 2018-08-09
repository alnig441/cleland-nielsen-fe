import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminDomainRoutingModule } from "./admin-domain-routing.module";
import { AdminDomainComponent } from "./admin-domain.component";
import { UsersComponent } from "./users/users.component";
import { AccountsComponent } from "./accounts/accounts.component";
import { PermissionsComponent } from "./permissions/permissions.component";
import { FormsModule } from "@angular/forms";
import { UserPanelComponent } from "../../../components/userPanel/user-panel.component";
import { UuidTransformPipe } from "../../../pipes/uuid.transform";
import { AccountsPanelComponent } from "../../../components/accountsPanel/accountsPanel.component";
import { PermissionsPanelComponent } from "../../../components/permissionsPanel/permissionsPanel.component";
import { SidebarComponent } from "../../../components/sidebar/sidebar.component";
import { MessagebarComponent } from "../../../components/messagebar/messagebar.component";
import { InfobarComponent } from "../../../components/infobar/infobar.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        AdminDomainRoutingModule
    ],
    declarations: [
        SidebarComponent,
        MessagebarComponent,
        InfobarComponent,
        AdminDomainComponent,
        UsersComponent,
        UserPanelComponent,
        AccountsComponent,
        AccountsPanelComponent,
        PermissionsComponent,
        PermissionsPanelComponent,
        UuidTransformPipe,
    ],
    exports: [ UuidTransformPipe ],
    providers: []
})

export class AdminDomainModule {}