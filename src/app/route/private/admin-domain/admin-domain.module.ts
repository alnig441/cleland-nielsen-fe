import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminDomainRoutingModule } from "./admin-domain-routing.module";
import { AdminComponent } from "./admin-domain.component";
import { UsersComponent } from "./users/users.component";
import { AccountsComponent } from "./accounts/accounts.component";
import { PermissionsComponent } from "./permissions/permissions.component";

@NgModule({
    imports: [
        CommonModule,
        AdminDomainRoutingModule
    ],
    declarations: [
        AdminComponent,
        UsersComponent,
        AccountsComponent,
        PermissionsComponent,

    ],
    exports: [],
    providers: []
})

export class AdminDomainModule {}