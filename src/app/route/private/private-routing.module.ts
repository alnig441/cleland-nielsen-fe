import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuardService } from "../../services/auth-guard.service";

const privateRoutes: Routes = [
    {
        path: 'user-domain',
        loadChildren: "route/private/user-domain/user-domain-module#UserDomainModule",
        canLoad: [AuthGuardService]
    },
    {
        path: 'admin-domain',
        loadChildren: "route/private/admin-domain/admin-domain.module#AdminDomainModule",
        canLoad: [AuthGuardService]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(privateRoutes)
    ],
    exports: [
        RouterModule
    ],
    providers: [
    ]
})

export class PrivateRoutingModule {}