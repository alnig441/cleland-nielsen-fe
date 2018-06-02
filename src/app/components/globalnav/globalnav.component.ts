import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { LINKS } from "../../constants/links";

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
            .map(() => LINKS)
            .subscribe((links) => {

                if(this.authService.isLoggedIn){
                    this.navbarLinks = links.private;
                    if(this.authService.isAdmin){
                        this.navbarLinks = links.private.concat(links.admin);
                    }
                } else {
                    this.navbarLinks = links.public;
                }

            })

    }

    logout() : void {
        this.authService.logout();
        this.router.navigate([this.authService.redirectUrl]);
    }
}