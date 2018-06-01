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

    navbarLinks = new Array();

    constructor(private http: HttpClient, private router: Router, private activatedRoute: ActivatedRoute, private authService: AuthService) {}

    public ngOnInit(): void {

        console.log('app comp init');

        this.router.events.filter((event)=> event instanceof NavigationEnd)
            .map(() => this.router.routerState.snapshot.root.children[0].data)
            .subscribe((links) => {

                let route = this.router.routerState.snapshot.url;
                let arr = [];

                Object.keys(links).length == 1 ? links = links[0] : links = links ;

                // this.authService.isLoggedIn ? this.public = false : this.public = true ;

                if(route === '/home' || route === '/images') {
                    for(var link in links) {
                        arr.push(links[link]);
                    };

                    this.navbarLinks = arr;
                }

            })
    }

    logout() : void {
        this.authService.logout();
        this.router.navigate([this.authService.redirectUrl]);
    }

}
