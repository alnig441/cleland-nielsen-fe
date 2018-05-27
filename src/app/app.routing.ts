import { CanDeactivate, RouterModule, Routes} from "@angular/router";
import { ModuleWithProviders, NgModule} from "@angular/core";

import { HomeComponent } from "./route/home/home.component";
import { PrivateComponent } from "./route/private/private.component";
import { AdminComponent } from "./route/private/admin/admin.component";
import { AuthGuardService } from "./services/auth-guard.service";

const APP_ROUTES: Routes = [
    {
        path: "",
        component: HomeComponent,
        data: ['home', 'about', 'work', 'contact']
    },
    {
        path: "private",
        component: PrivateComponent,
        canActivate: [AuthGuardService],
        data: ['images', "events", "latest"],
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
