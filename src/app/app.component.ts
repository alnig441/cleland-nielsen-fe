import { Component, OnInit, ViewEncapsulation, ElementRef, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router, NavigationStart, ActivatedRoute, NavigationEnd } from "@angular/router";
import { AuthService } from "./services/auth.service";
const SiteCopy = require("../../api/site_copy.json");

@Component({
    selector: "app-root",
    template: require("./app.component.pug"),
    styleUrls: [ "./app.component.scss" ],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

    constructor(private http: HttpClient, private router: Router, private activatedRoute: ActivatedRoute, private authService: AuthService) {}

    public ngOnInit(): void {
        console.log('app comp init');
    }
}
