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
        path: "private",
        redirectTo: "/images",
        pathMatch: "full",
        canActivate: [AuthGuardService]
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
