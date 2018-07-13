import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { HttpAuthService } from "../../services/httpAuth.service";
import { LINKS } from "../../constants/links";


@Component({
    selector: 'app-sidebar',
    template: require('./sidebar.component.pug'),
    encapsulation: ViewEncapsulation.None
})

export class SidebarComponent implements OnInit {

    sidebarLinks = new Array();

    constructor(private httpAuth: HttpAuthService, private activatedRoute: ActivatedRoute, private authService: AuthService){}

    ngOnInit(): void {
        let path = this.activatedRoute.snapshot.url[0].path;
        this.httpAuth.isAdmin ? this.sidebarLinks = LINKS.sidebar[path].admin : null;
        path === 'users' ? this.sidebarLinks = LINKS.sidebar[path].admin: this.sidebarLinks = LINKS.sidebar[path].general.concat(this.sidebarLinks);

    }
}``