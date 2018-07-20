import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpAuthService } from "../../services/httpAuth.service";
import { ImageServices } from "../../services/image.services";
import {ImageModel} from "../../models/image.model";
import {HttpResponse} from "@angular/common/http";


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
            })
   }

   getOne() {
        console.log(`getting ONE of ${this.activeService}`);
   }

   getLatest() {
        this[this.activeService].getLatest()
   }

   getList() {
        console.log(`getting LIST of ${this.activeService}`);
        this[this.activeService].getList()
   }

}