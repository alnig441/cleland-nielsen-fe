import { NgModule } from "@angular/core";
import { PrivateRoutingModule } from "./private-routing.module";
import { PrivateComponent } from "./private.component";
import { AdminComponent } from "./admin/admin.component";

@NgModule({
    imports: [
        PrivateRoutingModule
    ],
    declarations: [
        PrivateComponent,
        AdminComponent
    ],
    providers: [

    ]
})

export class RestrictedModule {}