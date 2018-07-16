import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpAuthService } from "../../services/httpAuth.service";
import { LINKS } from "../../constants/links";
import { ImageServices } from "../../services/image.services";


@Component({
    selector: 'app-sidebar',
    template: require('./sidebar.component.pug'),
    encapsulation: ViewEncapsulation.None
})

export class SidebarComponent implements OnInit {

    sidebarLinks = new Array();

    serviceDirectory: string;

    constructor( private httpAuth: HttpAuthService, private activatedRoute: ActivatedRoute, private images: ImageServices){}

    ngOnInit(): void {
        let path = this.activatedRoute.snapshot.url[0].path;
        this.httpAuth.isAdmin ? this.sidebarLinks = LINKS.sidebar[path].admin : null;
        path === 'users' ? this.sidebarLinks = LINKS.sidebar[path].admin: this.sidebarLinks = LINKS.sidebar[path].general.concat(this.sidebarLinks);

        this.serviceDirectory = path;

    }

   getAll() {
        this[this.serviceDirectory].getAll()
            .subscribe((images : any) => {
                console.log('calling imageServices from sidebar', images);
            })
   }

   getOne() {

   }

   getLatest() {

   }

   combinedSearch() {

   }

}