import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminComponent } from "./admin/admin.component";
import { PrivateRoutingModule } from "./private-routing.module";
import { UsersComponent } from "./users/users.component";
import { EventsComponent } from "./events/events.component";
import { ImagesComponent } from "./images/images.component";

@NgModule({
    imports: [
        CommonModule,
        PrivateRoutingModule
    ],
    declarations: [
        AdminComponent,
        UsersComponent,
        EventsComponent,
        ImagesComponent
    ],
    exports: [
    ]
})

export class PrivateModule {}