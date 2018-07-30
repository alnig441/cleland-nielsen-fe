import { Component, OnInit, ViewEncapsulation, ElementRef, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router, NavigationStart, ActivatedRoute, NavigationEnd } from "@angular/router";
import { HttpAuthService } from "./services/httpAuth.service";

@Component({
    selector: "app-root",
    template: require("./app.component.pug"),
    styleUrls: [ "./app.component.scss" ],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

    constructor(private http: HttpClient, private router: Router, private activatedRoute: ActivatedRoute, private activeUser: HttpAuthService) {}

    public ngOnInit(): void {
        console.log('app comp init');
    }
}
