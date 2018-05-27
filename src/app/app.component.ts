import { Component, OnInit, ViewEncapsulation, ElementRef, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router, NavigationStart, ActivatedRoute, NavigationEnd } from "@angular/router";
const SiteCopy = require("../../api/site_copy.json");

@Component({
    selector: "app-root",
    template: require("./app.component.pug"),
    styleUrls: [ "./app.component.scss" ],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

    private app: string[] = SiteCopy.App;

    constructor(private http: HttpClient, private router: Router, private activatedRoute: ActivatedRoute) {}

    public ngOnInit(): void {

        this.router.events.filter((event)=> event instanceof NavigationEnd)
            .map(() => this.router.routerState.snapshot.root.children[0].data)
            .subscribe((x) => {

                console.log('mapped links: ', x);

            })
    }

}
