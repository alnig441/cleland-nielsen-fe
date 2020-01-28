import { CanDeactivate, RouterModule, Routes } from "@angular/router";
import { ModuleWithProviders, NgModule } from "@angular/core";
import { AuthenticationGuardServices } from "./services/authentication-guard.services";

const APP_ROUTES: Routes = [
    {
        path: 'private/user-domain',
        redirectTo: '/images',
        pathMatch: 'full',
    },
    {
        path: 'private/admin-domain',
        redirectTo: '/users',
        pathMatch: 'full',
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
        AuthenticationGuardServices
    ]
})
export class AppRouting {
    
}
