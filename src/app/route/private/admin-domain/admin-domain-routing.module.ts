import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UsersComponent } from "./users/users.component";
import { AdminDomainComponent } from "./admin-domain.component";
import { AuthenticationGuardServices } from "../../../services/authentication-guard.services";
import { AccountsComponent } from "./accounts/accounts.component";
import { PermissionsComponent } from "./permissions/permissions.component";

const ADMIN_ROUTES: Routes = [
    {
        path: '',
        component: AdminDomainComponent,
        canActivateChild: [ AuthenticationGuardServices],
        children: [
            {
                path: 'users',
                component: UsersComponent
            },
            {
                path: 'accounts',
                component: AccountsComponent
            },
            {
                path: 'permissions',
                component: PermissionsComponent
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(ADMIN_ROUTES)
    ],
    exports: [
        RouterModule
    ],
    providers: [ AuthenticationGuardServices ]
})

export class AdminDomainRoutingModule {}