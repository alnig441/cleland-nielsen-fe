import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import { HttpClient } from "@angular/common/http";

@Component({
    selector: 'app-globalnav',
    template: require('./globalnav.component.pug'),
    encapsulation: ViewEncapsulation.None
})

export class GlobalnavComponent implements OnInit {

    navbarLinks = new Array();

    constructor(private http: HttpClient, private router: Router, private activatedRoute: ActivatedRoute, private authService: AuthService) {}

    ngOnInit(): void {
        console.log('globalnav comp init');

        this.router.events.filter((event)=> event instanceof NavigationEnd)
            .map(() => this.router.routerState.snapshot.root.children[0].data)
            .subscribe((links) => {

                let route = this.router.routerState.snapshot.url;
                let arr = [];

                Object.keys(links).length == 1 ? links = links[0] : links = links ;

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