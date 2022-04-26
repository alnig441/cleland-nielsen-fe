import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { AboutComponent } from "./about/about.component";
import { ContactComponent } from "./contact/contact.component";
import { WorkComponent } from "./work/work.component";
import { HomeComponent } from "./home/home.component";
import { PublicRoutingModule } from "./public-routing.module";

@NgModule ({
    imports: [
        CommonModule,
        PublicRoutingModule,
        FormsModule,
    ],
    declarations: [
        AboutComponent,
        ContactComponent,
        WorkComponent,
        HomeComponent,
    ],
    providers: [

    ],
    exports: [
    ]
})

export class PublicModule {}
