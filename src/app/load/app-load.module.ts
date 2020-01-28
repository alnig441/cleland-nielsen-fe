import { NgModule, APP_INITIALIZER } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { AppLoadServices } from "../services/application-load.services";

export function init_app(appLoad: AppLoadServices) {
    return () => appLoad.initializeApp();
}

export function get_settings(appLoad: AppLoadServices) {
    return () => appLoad.getSettings();
}


@NgModule({
    imports: [
        HttpClientModule
    ],
    providers: [
        AppLoadServices,
        { provide: APP_INITIALIZER, useFactory: init_app, deps: [AppLoadServices], multi: true},
        { provide: APP_INITIALIZER, useFactory: get_settings, deps: [AppLoadServices], multi: true},
    ]
})

export class AppLoadModule {}