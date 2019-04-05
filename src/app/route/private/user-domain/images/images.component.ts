import { Component, OnInit, ViewEncapsulation, DoCheck } from "@angular/core";
import { MongoImageServices } from "../../../../services/mongoImage.services";
import { AuthenticationService } from "../../../../services/authentication.service";
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

    private albumViewSelector: object = new Object();
    private showImageInformation: any[] = new Array();
    private years: number[] = new Array();
    private months: number[] = new Array();
    private currentPage: number;
    private doAnd: boolean = false;
    private pages: number;
    private total: number;
    private documents: any[] = new Array();

    constructor(
        private formManager: ServiceModelManagerService,
        private activatedRoute: ActivatedRoute,
        private activeUser: AuthenticationService,
        private mongoImageService: MongoImageServices
    ){}

    ngOnInit(): void {
      this.formManager.setService(this.activatedRoute.snapshot.url[0].path);

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
      index || index == 0 ? this.showImageInformation[index] = this.documents[index] : this.showImageInformation = new Array();
    }

    openModal(imageId: any):void {
        this.documents.forEach((document, index) => {
            if(document['_id'] == imageId){
                this.albumViewSelector['selectedIndex'] = index;
                $('.assetviewer-modal').modal('show');
            };
        })
    }

    cancelModal(): void {
        $('.assetviewer-modal').modal('hide');
    }

    flipThroughImages(step: string): void {
        var length = this.documents.length;
        switch(step) {
            case 'next':
                this.albumViewSelector['selectedIndex'] = this.albumViewSelector['selectedIndex'] == length - 1 ?
                  0 :
                  this.albumViewSelector['selectedIndex'] + 1;
                break
            case 'previous':
                this.albumViewSelector['selectedIndex'] = this.albumViewSelector['selectedIndex'] == 0 ?
                  length - 1 :
                  this.albumViewSelector['selectedIndex'] - 1;
                break
        }
    }
}
