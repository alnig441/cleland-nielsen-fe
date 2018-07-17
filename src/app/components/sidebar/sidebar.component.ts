import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpAuthService } from "../../services/httpAuth.service";
import { ImageServices } from "../../services/image.services";


@Component({
    selector: 'app-sidebar',
    template: require('./sidebar.component.pug'),
    encapsulation: ViewEncapsulation.None
})

export class SidebarComponent implements OnInit {

    activeService: string;

    constructor( private httpAuth: HttpAuthService, private activatedRoute: ActivatedRoute, private images: ImageServices){}

    ngOnInit(): void {
        this.activeService = this.activatedRoute.snapshot.url[0].path;
    }

   getAll() {
        this[this.activeService].getAll()
            .subscribe((images : any) => {
                console.log('calling imageServices from sidebar', images);
                this[this.activeService].images = images;
            })
   }

   getOne() {
        console.log(`getting ONE of ${this.activeService}`);
   }

   getLatest() {
        console.log(`getting LATEST of ${this.activeService}`);
   }

   getList() {
        console.log(`getting LIST of ${this.activeService}`);
   }

}