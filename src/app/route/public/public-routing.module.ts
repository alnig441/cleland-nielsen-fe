import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { AboutComponent } from "./about/about.component";
import { HomeComponent } from "./home/home.component";
import { WorkComponent } from "./work/work.component";
import { ContactComponent } from "./contact/contact.component";

const PUBLIC_ROUTES: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'about',
        component: AboutComponent
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'work',
        component: WorkComponent
    },
    {
        path: 'contact',
        component: ContactComponent
    },
]

@NgModule({
    imports: [
        RouterModule.forChild(PUBLIC_ROUTES)
    ],
    exports: [
        RouterModule
    ]
})

export class PublicRoutingModule {}