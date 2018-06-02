import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EventsComponent } from "./events/events.component";
import { UsersComponent } from "./users/users.component";
import { ImagesComponent } from "./images/images.component";
import { AuthGuardService } from "../../services/auth-guard.service";

const privateRoutes: Routes = [
    {
        path: 'users',
        component: UsersComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'images',
        component: ImagesComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'events',
        component: EventsComponent,
        canActivate: [AuthGuardService]
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