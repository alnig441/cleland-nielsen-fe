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
    private documents: any[] = new Array();

    constructor(
        private formManager: ServiceModelManagerService,
        private activatedRoute: ActivatedRoute,
        private activeUser: AuthenticationService,
        private imageService: ImageServices,
        private mongoImageService: MongoImageServices
    ){}

    ngOnInit(): void {
      this.currentPage = 1;

        this.mongoImageService.generateTabs()
            .then((years: number[]) => {
              this.years = years.reverse();
              this.albumViewSelector['year'] = this.years[0];
              this.mongoImageService.generateTabs(this.years[0])
                  .then((months: number[]) => {
                    this.months = months;
                    this.albumViewSelector['month'] = this.months[this.months.length - 1];
                    let model = new MongoImageModel( null, this.years[0], this.months[this.months.length - 1] );
                    this.mongoImageService.search(model, this.currentPage, true)
                        .then((result: any) => {
                          this.pages = result.pages;
                          this.total = result.total;
                          this.documents = result.docs;
                        })
                  })
            })
    }

    ngDoCheck(): void {
    }

    setAlbumView(selector?: any): void {
      this.doAnd = true;
      this.currentPage = 1;

      if ( selector > 11) {
        this.albumViewSelector['year'] = selector;
        this.getTabs(selector, ( model: MongoImageModel ) => {
          this.getDocs( model, this.currentPage, this.doAnd );
        })
      }

      else {
        this.albumViewSelector['month'] = selector;
        let model = this.setModel(this.albumViewSelector['year'], selector);
        this.getDocs( model, this.currentPage, this.doAnd );
      }
    }

    setModel ( year: number, month: number ) {
      return new MongoImageModel( null, year, month );
    }

    getTabs ( selector: number, cb: any ) {
      this.mongoImageService.generateTabs( selector )
        .then((months: any) => {
          this.months = months;
          this.albumViewSelector['month'] = this.months[this.months.length -1];
          let model = this.setModel(this.albumViewSelector['year'], this.albumViewSelector['month']);
          cb(model);
        })
    }

    getDocs ( model: MongoImageModel, page: number, doAnd: boolean ) {
      this.mongoImageService.search( model, page, doAnd )
        .then((body: any) => {
          this.pages = body.pages;
          this.total = body.total;
          this.documents = body.docs;
        })
    }

    turnAlbumPage(direction: string): void {
      this.currentPage != this.pages && direction == 'forward' ?
        this.currentPage ++ :
        this.currentPage != 1 && direction == 'rewind' ?
          this.currentPage -- :
          null;

      let model = this.setModel( this.albumViewSelector['year'], this.albumViewSelector['month']);
      this.doAnd = true;
      this.getDocs( model, this.currentPage, this.doAnd );
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
