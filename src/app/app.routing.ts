import { CanDeactivate, RouterModule, Routes} from "@angular/router";
import { ModuleWithProviders, NgModule} from "@angular/core";

import { HomeComponent } from "./route/public/home/home.component";
import { PrivateComponent } from "./route/private/private.component";
import { AdminComponent } from "./route/private/admin/admin.component";
import { AuthGuardService } from "./services/auth-guard.service";
import { AboutComponent } from "./route/public/about/about.component";
import { ContactComponent } from "./route/public/contact/contact.component";
import { WorkComponent } from "./route/public/work/work.component";

import { LINKS } from "./constants/links";

const APP_ROUTES: Routes = [
    {
        path: "",
        component: HomeComponent,
        data: LINKS.public
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
        path: 'about',
        component: AboutComponent
    },
    {
        path: 'work',
        component: WorkComponent
    },
    {
        path: 'contact',
        component: ContactComponent
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
