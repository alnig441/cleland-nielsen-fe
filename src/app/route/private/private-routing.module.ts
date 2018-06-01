import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminComponent } from "./admin/admin.component";
import { EventsComponent } from "./events/events.component";
import { UsersComponent } from "./users/users.component";
import { ImagesComponent } from "./images/images.component";
import { LINKS } from "../../constants/links";

const privateRoutes: Routes = [
    {
        path: 'users',
        component: UsersComponent,
        canActivate: []
    },
    {
        path: 'images',
        component: ImagesComponent,
        data: [LINKS.private],
        canActivate: []
    },
    {
        path: 'events',
        component: EventsComponent,
        canActivate: []
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