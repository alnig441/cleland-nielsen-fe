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

    public: boolean = true;

    navbarLinks:any;

    constructor(private http: HttpClient, private router: Router, private activatedRoute: ActivatedRoute) {}

    public ngOnInit(): void {

        this.router.events.filter((event)=> event instanceof NavigationEnd)
            .map(() => this.router.routerState.snapshot.root.children[0].data)
            .subscribe((links) => {

                let route = this.router.routerState.snapshot.url;

                route === '/private' ? this.public = false : this.public = true ;

                if(route === '/' || route === '/private') {
                    let array = [];

                    for(var link in links) {
                        let obj = {name: ''};
                        obj.name = links[link];
                        array.push(obj);
                    }

                    this.navbarLinks = array;
                }

            })
    }

    logout() : void {
        this.router.navigateByUrl('/');
    }

}
