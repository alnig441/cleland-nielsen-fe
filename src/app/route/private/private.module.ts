import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PrivateRoutingModule } from "./private-routing.module";
import { PrivateComponent } from "./private.component";
import { AdminComponent } from "./admin/admin.component";

@NgModule({
    imports: [
        CommonModule,
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