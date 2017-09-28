import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { HttpClient } from "@angular/common/http";
const SiteCopy = require("../../api/site_copy.json");

@Component({
    selector: "plum-app",
    template: require("./app.component.pug"),
    styleUrls: [ "./app.component.scss" ],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

    private app: string[] = SiteCopy.App;

    constructor(private http: HttpClient) {}

    public ngOnInit(): void {

    }

}
