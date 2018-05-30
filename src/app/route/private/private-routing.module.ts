import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminComponent } from "./admin/admin.component";
import { EventsComponent } from "./events/events.component";
import { UsersComponent } from "./users/users.component";
import { ImagesComponent } from "./images/images.component";

const privateRoutes: Routes = [
    {
        path: "",
        component: EventsComponent,
        canActivate: [],
        children: [
            {
                path: "admin",
                component: AdminComponent,
                children: [

                ]
            }
        ]
    },
    {
        path: 'users',
        component: UsersComponent,
        canActivate: []
    },
    {
        path: 'images',
        component: ImagesComponent,
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