import { Component, OnInit, ViewEncapsulation, ElementRef, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";
const SiteCopy = require("../../api/site_copy.json");

@Component({
    selector: "app-root",
    template: require("./app.component.pug"),
    styleUrls: [ "./app.component.scss" ],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

    @ViewChild('myChild') child: any;

    private app: string[] = SiteCopy.App;

    constructor(private http: HttpClient) {}

    public ngOnInit(): void {

        console.log('childView working: ', this.child)

    }

}
