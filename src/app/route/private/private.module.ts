import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PrivateComponent } from "./private.component";
import { AdminComponent } from "./admin/admin.component";
import { PrivateRoutingModule } from "./private-routing.module";

@NgModule({
    imports: [
        CommonModule,
        PrivateRoutingModule
    ],
    declarations: [
        PrivateComponent,
        AdminComponent
    ]
})

export class PrivateModule {}