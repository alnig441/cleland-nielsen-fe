import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { CommonModule } from "@angular/common";

import { ROUTING } from "./app.routing";

import { HomeComponent } from "./route/home/home.component";
import { NgForComponent } from "./route/ngFor/ngfor.component";
import {LoginRoutingModule} from "./route/login/login-routing.module";
import {LoginComponent} from "./route/login/login.component";


@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        HttpModule,
        CommonModule,
        LoginRoutingModule,
        ROUTING
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        NgForComponent,
        LoginComponent
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {}