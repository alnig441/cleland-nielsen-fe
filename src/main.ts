import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { enableProdMode } from "@angular/core";
import { AppModule } from "./app/app.module";
import "font-awesome/scss/font-awesome.scss";
import "../config/font-awesome.config";

if(process.env.ENV === "production") {
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
