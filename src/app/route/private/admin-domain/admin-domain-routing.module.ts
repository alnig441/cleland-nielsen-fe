import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UsersComponent } from "./users/users.component";
import { AdminComponent } from "./admin-domain.component";
import { AuthGuardService } from "../../../services/auth-guard.service";
import { AccountsComponent } from "./accounts/accounts.component";
import { PermissionsComponent } from "./permissions/permissions.component";

const ADMIN_ROUTES: Routes = [
    {
        path: '',
        component: AdminComponent,
        canActivateChild: [AuthGuardService],
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
    providers: [ AuthGuardService ]
})

export class AdminDomainRoutingModule {}