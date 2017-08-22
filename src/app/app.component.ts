import { Component, OnInit, ViewEncapsulation } from "@angular/core";

@Component({
    selector: "plum-app",
    template: require("./app.component.pug"),
    styleUrls: [ "./app.component.scss" ],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
    
    public constructor() {}
    
    public ngOnInit(): void {
        console.log('pis og lort', process.env.NODE_ENV, process.env.ENV)
    }
    
}