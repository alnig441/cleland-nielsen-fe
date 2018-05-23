import { CanDeactivate, RouterModule, Routes} from "@angular/router";
import { ModuleWithProviders, NgModule} from "@angular/core";

import { HomeComponent } from "./route/home/home.component";
import { PrivateComponent } from "./route/private/private.component";
import { AdminComponent } from "./route/private/admin/admin.component";
import { AuthGuardService } from "./services/auth-guard.service";

const APP_ROUTES: Routes = [
    {
        path: "",
        component: HomeComponent
    },
    {
        path: "private",
        component: PrivateComponent,
        canActivate: [AuthGuardService],
        canLoad: [],
        children: [
            {
                path: 'admin',
                component: AdminComponent,
                canActivate: [],
                children: [

                ]
            }
        ]
    },
    {
        path: '**',
        component: HomeComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            APP_ROUTES,
            {
                enableTracing: true
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
