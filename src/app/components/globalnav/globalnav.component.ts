import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { LINKS } from "../../constants/links";
import { HttpAuthService } from "../../services/httpAuth.service";

@Component({
    selector: 'app-globalnav',
    template: require('./globalnav.component.pug'),
    encapsulation: ViewEncapsulation.None
})

export class GlobalnavComponent implements OnInit {

    navbarLinks = new Array();

    constructor(private http: HttpClient, private router: Router, private activatedRoute: ActivatedRoute, private authService: AuthService, private httpAuth: HttpAuthService) {}

    ngOnInit(): void {
        console.log('globalnav comp init');

        this.router.events.filter((event)=> event instanceof NavigationEnd)
            .map(() => LINKS)
            .subscribe((links) => {
                // console.log('hello from filter\nis logged in: ', this.httpAuth.isLoggedIn, '\n isadmin', this.httpAuth.isAdmin);
                if(this.httpAuth.isLoggedIn){
                    this.navbarLinks = links.private;
                    if(this.httpAuth.isAdmin){
                        this.navbarLinks = links.private.concat(links.admin);
                        console.log('navbar links: ', this.navbarLinks);
                    }
                } else {
                    this.navbarLinks = links.public;
                }

            })

    }

    logout() : void {
        this.httpAuth.logout();
        // this.authService.logout();
        // this.router.navigate([this.authService.redirectUrl]);
        this.router.navigate([this.httpAuth.redirectUrl]);
    }
}