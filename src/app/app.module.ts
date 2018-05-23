import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { CommonModule } from "@angular/common";

import { AppRouting } from "./app.routing";

import { HomeComponent } from "./route/home/home.component";
import { LoginRoutingModule } from "./route/login/login-routing.module";
import { LoginComponent } from "./route/login/login.component";
import { PrivateComponent } from "./route/private/private.component";
import { AdminComponent } from "./route/private/admin/admin.component";


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
        AdminComponent
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {}