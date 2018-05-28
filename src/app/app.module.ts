import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { CommonModule } from "@angular/common";

import { AppRouting } from "./app.routing";

import { HomeComponent } from "./route/public/home/home.component";
import { LoginRoutingModule } from "./route/login/login-routing.module";
import { LoginComponent } from "./route/login/login.component";
import { PrivateComponent } from "./route/private/private.component";
import { AdminComponent } from "./route/private/admin/admin.component";
import { AboutComponent } from "./route/public/about/about.component";
import { ContactComponent } from "./route/public/contact/contact.component";
import { WorkComponent } from "./route/public/work/work.component";


@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        HttpModule,
        CommonModule,
        LoginRoutingModule,
        AppRouting,
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        PrivateComponent,
        AdminComponent,
        AboutComponent,
        ContactComponent,
        WorkComponent
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {}