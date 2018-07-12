import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
const SiteCopy = require("../../../../../api/site_copy.json");

@Component({
    selector: "app-home",
    template: require("./home.component.pug"),
    styleUrls: [ "./home.component.scss" ]
})
export class HomeComponent implements OnInit {

    constructor(private http: HttpClient) {}

    private home: string[] = SiteCopy.Home;

    public ngOnInit(): void {
        console.log('home component initialised\nLocalStorage: ', localStorage);
    }
}

interface ItemsResponse {
    Home: string[];
}