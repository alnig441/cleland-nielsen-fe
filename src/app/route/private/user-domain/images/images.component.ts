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
    private years: number[] = new Array();
    private months: number[] = new Array();
    private currentPage: number;
    private lastPage: number;

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
      console.log('onInit: ',this.albumViewSelector,this.months,this.years );
      this.currentPage = 1;

        this.mongoImageService.generateTabs()
            .then((years: number[]) => {
              this.years = years.reverse();

              this.mongoImageService.generateTabs(this.years[0])
                  .then((months: number[]) => {
                    this.months = months;
                    let query = new MongoImageModel( null, this.years[0], this.months[this.months.length - 1] );

                    this.mongoImageService.search(query, this.currentPage, true)
                        .then((result: any) => {
                          this.pages = result.pages;
                          this.total = result.total;
                          this.docs = result.docs;
                          this.setAlbumView();
                        })
                  })
            })
    }

    ngDoCheck(): void {
    }

    setAlbumView(selector?: any): void {
      console.log('selector: ', selector, '\nmonths: ', this.months, '\nyears: ', this.years);

        if ( !selector && selector != 0) {
          this.albumViewSelector['year'] = this.years[0];
          this.albumViewSelector['month'] = this.months[this.months.length -1];
        }

        else if ( selector > 11) {
          this.albumViewSelector['year'] = selector;
          this.mongoImageService.generateTabs(selector)
            .then( months => {
              this.months = months;
              this.albumViewSelector['month'] = this.months[this.months.length -1];
            })
        }

        else {
          this.currentPage = 1;
          this.doAnd = true;
          let query = new MongoImageModel( null, this.albumViewSelector['year'], selector );
          this.albumViewSelector['month'] = selector;
          console.log(query);
          this.mongoImageService.search( query, this.currentPage, this.doAnd)
            .then( (body:any) => {
              this.pages = body.pages;
              this.total = body.total;
              this.docs = body.docs;
            })
        }
        // this.currentPage = 0;
        // this.lastPage = Math.ceil(this.albumView.length / 6) - 1;
        // this.setAlbumViewSubset();
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
