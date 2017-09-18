import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { enableProdMode } from "@angular/core";
import { AppModule } from "./app/app.module";

if(process.env.ENV === "production") {
    console.log('main.ts: ', process.env.ENV);
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);