import { RouterModule, Routes } from "@angular/router";
import { ModuleWithProviders, NgModule} from "@angular/core";

import { HomeComponent } from "./route/home/home.component";

const APP_ROUTES: Routes = [
    {
        path: "",
        component: HomeComponent
    },
    {
        path: "private",
        loadChildren: "app/route/private/private.module#PrivateModule"
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            APP_ROUTES,
        )
    ],
    exports: [
        RouterModule
    ],
    providers: [
        
    ]
})
export class AppRouting {
    
}

// export const ROUTING: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);