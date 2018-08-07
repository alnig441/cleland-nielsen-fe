import { CanDeactivate, RouterModule, Routes } from "@angular/router";
import { ModuleWithProviders, NgModule } from "@angular/core";

import { AuthGuardService } from "./services/auth-guard.service";

const APP_ROUTES: Routes = [
    {
        path: "",
        redirectTo: "/home",
        pathMatch: 'full'
    },
    {
        path: 'private/user-domain',
        redirectTo: '/images',
        pathMatch: 'full',
        canLoad: [AuthGuardService]
    },
    {
        path: 'private/admin-domain',
        redirectTo: '/users',
        pathMatch: 'full',
        canLoad: [AuthGuardService]
    },
    {
        path: '**',
        redirectTo: '/home',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            APP_ROUTES,
            {
                enableTracing: false
            }
        )
    ],
    exports: [
        RouterModule
    ],
    providers: [
        AuthGuardService
    ]
})
export class AppRouting {
    
}
