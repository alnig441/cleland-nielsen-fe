import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthenticationGuardServices  } from "../../../services/authentication-guard.services";
import { ImagesComponent } from "./images/images.component";
import { VideosComponent } from "./videos/videos.component";
import { UserDomainComponent } from "./user-domain.component";

const USER_ROUTES: Routes = [
    {
        path: '',
        component: UserDomainComponent,
        canActivateChild: [ AuthenticationGuardServices ],
        children: [
            {
                path: 'images',
                component: ImagesComponent
            },
            {
                path: 'videos',
                component: VideosComponent
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(USER_ROUTES)
    ],
    exports: [
        RouterModule
    ],
    providers: [ AuthenticationGuardServices ]
})

export class UserDomainRoutingModule {}