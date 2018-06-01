import { CanDeactivate, RouterModule, Routes } from "@angular/router";
import { ModuleWithProviders, NgModule } from "@angular/core";

import { AuthGuardService } from "./services/auth-guard.service";

import { LINKS } from "./constants/links";

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
        // data: [LINKS.private],
        canActivate: [AuthGuardService]
    },
    // {
    //     path: "private",
    //     component: ImagesComponent,
    //     canActivate: [AuthGuardService],
    //     data: LINKS.private,
    //     canLoad: [],
    //     children: [
    //     ]
    // },
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
