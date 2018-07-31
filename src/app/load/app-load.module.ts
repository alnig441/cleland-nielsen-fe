import { NgModule, APP_INITIALIZER } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { AppLoadService } from "../services/app-load.service";

export function init_app(appLoad: AppLoadService) {
    return () => appLoad.initializeApp();
}

export function get_settings(appLoad: AppLoadService) {
    return () => appLoad.getSettings();
}


@NgModule({
    imports: [
        HttpClientModule
    ],
    providers: [
        AppLoadService,
        { provide: APP_INITIALIZER, useFactory: init_app, deps: [AppLoadService], multi: true},
        { provide: APP_INITIALIZER, useFactory: get_settings, deps: [AppLoadService], multi: true},
    ]
})

export class AppLoadModule {}