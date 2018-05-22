import { NgModule} from "@angular/core";
import { RouterModule, Routes} from "@angular/router";
import { PrivateComponent } from "./private.component";
import {AdminComponent} from "./admin/admin.component";

const privateRoutes: Routes = [
    {
        path: "private",
        component: PrivateComponent
    },
    {
        path: "admin",
        component: AdminComponent
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

    ]
})

export class PrivateRoutingModule {}