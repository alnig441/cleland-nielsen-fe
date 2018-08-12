import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuardService } from "../../services/authentication-guard.service";

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
        AuthGuardService
    ]
})

export class PrivateRoutingModule {}