import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
    selector: 'app-sidebar',
    template: require('./sidebar.component.pug'),
    encapsulation: ViewEncapsulation.None
})

export class SidebarComponent implements OnInit {

    sidebarLinks = new Array();

    constructor(private activatedRoute: ActivatedRoute, private authService: AuthService){}

    ngOnInit(): void {
        let path = this.activatedRoute.snapshot.url[0].path;
        switch(path) {
            case 'images' :
                this.sidebarLinks = ['image link 1', 'image link 2', 'image link 3'];
                if(this.authService.isAdmin) {
                    this.sidebarLinks = this.sidebarLinks.concat(['image admin link 1']);
                }
                break;
            case 'events' :
                this.sidebarLinks = ['events link 1']
                break;
            case 'users':
                this.sidebarLinks = ['users link 1']
                break;
        }
    }
}