import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AppAlertsComponent } from "./app-alerts.component";
import { AppAlertsServices } from "../../services/app-alerts.services";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
    imports: [
        CommonModule,
        BrowserAnimationsModule
    ],
    declarations: [
        AppAlertsComponent
    ],
    exports: [
        AppAlertsComponent
    ],
    providers: [
        AppAlertsServices,
    ]
})

export class AppAlertsModule {}