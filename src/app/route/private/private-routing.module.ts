import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthenticationGuardServices } from "../../services/authentication-guard.services";

const privateRoutes: Routes = [
    {
        path: 'user-domain',
        loadChildren: "route/private/user-domain/user-domain-module#UserDomainModule",
    },
    {
        path: 'admin-domain',
        loadChildren: "route/private/admin-domain/admin-domain.module#AdminDomainModule",
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
        AuthenticationGuardServices
    ]
})

export class PrivateRoutingModule {}