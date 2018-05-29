import { CanDeactivate, RouterModule, Routes } from "@angular/router";
import { ModuleWithProviders, NgModule } from "@angular/core";

import { PrivateComponent } from "./route/private/private.component";
import { AdminComponent } from "./route/private/admin/admin.component";
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
        component: PrivateComponent,
        canActivate: [AuthGuardService],
        data: LINKS.private,
        canLoad: [],
        children: [
            {
                path: 'admin',
                component: AdminComponent,
                canActivate: [],
                children: [
                    // {
                    //     path: 'image_mgmt'
                    // },
                    // {
                    //     path: 'user_mgmt'
                    // }
                ]
            },
            // {
            //     path: 'images'
            // },
            // {
            //     path: 'events'
            // },
            // {
            //     path: 'latest'
            // }
        ]
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
