import { Component, OnInit, ViewEncapsulation, DoCheck } from "@angular/core";
import { ImageServices } from "../../../../services/image.services";
import { MongoImageServices } from "../../../../services/mongoImage.services";
import { AuthenticationService } from "../../../../services/authentication.service";
import { ImageModel } from "../../../../models/image.model";
import { MongoImageModel } from "../../../../models/mongoImage.model";
import { ServiceModelManagerService } from "../../../../services/service-model-manager.service";
import { ActivatedRoute } from "@angular/router";

const $ = require('jquery');

@Component({
    selector: 'app-images',
    template: require('./images.component.pug'),
    styleUrls: ['./images.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ImagesComponent implements OnInit, DoCheck {

    private imageForm: ImageModel;
    private albumViewSelector: object = new Object();
    private albumView: ImageModel[] = new Array();
    private albumViewSubset: ImageModel[];
    private imageInformation: any[] = new Array();
    private years: any[] = new Array();
    private months: any[] = new Array();
    private currentPage: number;
    private lastPage: number;

    private mongoYears: any[] = new Array();
    private mongoMonths: any[] = new Array();
    private doAnd: boolean = false;
    private pages: number;
    private total: number;
    private docs: any[] = new Array();

    constructor(
        private formManager: ServiceModelManagerService,
        private activatedRoute: ActivatedRoute,
        private activeUser: AuthenticationService,
        private imageService: ImageServices,
        private mongoImageService: MongoImageServices
    ){}

    ngOnInit(): void {
        this.currentPage = 0;
        this.formManager.setService(this.activatedRoute.snapshot.url[0].path);
        this.imageService.getAll()
            .then((response) => {
                let array: any[] = [];
                this.imageService.images.forEach((year, tab) => {
                    if(year){
                        array.push(tab);
                    }
                })
                this.years = array.reverse();
                this.setAlbumView();
                this.setAlbumViewSubset();
            });

        this.mongoImageService.generateTabs()
            .then((years: any) => {
              console.log(years);
              this.mongoYears = years.reverse();

              this.mongoImageService.generateTabs(this.mongoYears[0].toString())
                  .then((months: any) => {
                    console.log(months);
                    this.mongoMonths = months;
                    let query = new MongoImageModel();
                    query.year = this.mongoYears[0];
                    query.month = this.mongoMonths[this.mongoMonths.length -1];
                    let page = 1;

                    this.mongoImageService.search(query, page, true)
                        .then((result: any) => {
                          console.log(result);
                          this.pages = result.pages;
                          this.total = result.total;
                          this.docs = result.docs;
                        })
                  })
            })
    }

    ngDoCheck(): void {
    }

    setAlbumView(x?: any): void {
        this.albumViewSelector['year'] = (!x && x !=0) ? this.imageService.images.length - 1 : x > 11 ? x : this.albumViewSelector['year'];
        this.months = this.imageService.images[this.albumViewSelector['year']] as any;

        this.albumViewSelector['month'] = ((!x && x != 0) || x > 11) ? this.months.length -1 : this.albumViewSelector['month'] = x ;
        this.albumView = this.months[this.albumViewSelector['month']] as ImageModel[];

        this.currentPage = 0;
        this.lastPage = Math.ceil(this.albumView.length / 6) - 1;
        this.setAlbumViewSubset();
    }

    turnAlbumPage(direction: string): void {
        direction == 'forward' ? (this.currentPage < this.lastPage ? this.currentPage++ : null) : (this.currentPage > 0 ? this.currentPage--: null);
        this.setAlbumViewSubset(direction);
    }

    setImageInfo(index?: any) : void {
        var image  = (index || index == 0) ? this.albumViewSubset[index] : null;

        switch (index) {
            case undefined:
                this.imageInformation.pop();
                break;
            default:
                this.imageInformation[index] = image;
        }

    }

    setAlbumViewSubset(next?: string) : void {
        this.albumViewSubset = next ? this.albumView.slice(this.currentPage * 6, this.currentPage * 6 + 6) : this.albumView.slice(0, 6);
    }

    openModal(imageId: any):void {
        this.albumView.forEach((image, index) => {
            if(image['id'] == imageId){
                this.albumViewSelector['selectedIndex'] = index;
                $('.assetviewer-modal').modal('show');
            };
        })
    }

    cancelModal(): void {
        $('.assetviewer-modal').modal('hide');
    }

    flipThroughImages(step: string): void {
        var length = this.imageService.images[this.albumViewSelector['year']][this.albumViewSelector['month']].length;
        switch(step) {
            case 'next':
                this.albumViewSelector['selectedIndex'] = this.albumViewSelector['selectedIndex'] == length - 1 ? 0 : this.albumViewSelector['selectedIndex'] + 1;
                break
            case 'previous':
                this.albumViewSelector['selectedIndex'] = this.albumViewSelector['selectedIndex'] == 0 ? length - 1 : this.albumViewSelector['selectedIndex'] - 1;
                break
        }
    }
}
