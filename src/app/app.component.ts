import { Component, OnInit, ViewEncapsulation } from "@angular/core";

@Component({
    selector: "app-root",
    template: require("./app.component.pug"),
    styleUrls: [ "./app.component.scss" ],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

    constructor() {}

    public ngOnInit(): void {

        console.log('app comp init');

    }
}
