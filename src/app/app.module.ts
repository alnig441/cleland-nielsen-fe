import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { CommonModule } from "@angular/common";

import { AppRouting } from "./app.routing";
import { LoginRoutingModule } from "./route/login/login-routing.module";

import { PublicModule } from "./route/public/public.module";
import { PrivateModule } from "./route/private/private.module";

import { LoginComponent } from "./route/login/login.component";
import { GlobalnavComponent } from "./components/globalnav/globalnav.component";
import { AppLoadModule } from "./load/app-load.module";




@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        HttpModule,
        CommonModule,
        LoginRoutingModule,
        PublicModule,
        PrivateModule,
        AppRouting,
        // AppLoadModule
    ],
    declarations: [
        AppComponent,
        GlobalnavComponent,
        LoginComponent,
    ],
    providers: [
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {}