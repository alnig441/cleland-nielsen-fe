import { Component, OnInit, ViewEncapsulation, DoCheck } from "@angular/core";
import { MongoImageServices } from "../../../../services/mongoImage.services";
import { AuthenticationServices } from "../../../../services/authentication.services";
import { MongoImageModel } from "../../../../models/mongoImage.model";
import { ServiceModelManagerServices } from "../../../../services/service-model-manager.services";
import { ActivatedRoute } from "@angular/router";
import { AppEditorServices } from "../../../../services/app-editor.services";
import { AppModalServices } from "../../../../services/app-modal.services";


const $ = require('jquery');

@Component({
    selector: 'app-images',
    template: require('./images.component.pug'),
    styleUrls: ['./images.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ImagesComponent implements OnInit {

    private albumViewSelector: object = new Object();
    private showImageInformation: any[] = new Array();
    private years: number[] = new Array();
    private months: number[] = new Array();
    private currentPage: number;
    private doAnd: boolean = false;
    private pages: number;
    private documents: any[] = new Array();
    private imageModel = new MongoImageModel();

    constructor(
        private models: ServiceModelManagerServices,
        private activatedRoute: ActivatedRoute,
        private activeUser: AuthenticationServices,
        private images: MongoImageServices,
        private editor: AppEditorServices,
        private modal: AppModalServices
    ){}

    ngOnInit(): void {
      this.modal.clear();
      this.models.setService(this.activatedRoute.snapshot.url[0].path);
      this.currentPage = 1;
      this.buildAlbum();
      this.images.onUpdatedView.subscribe((updatedView: any) => {
        if(!updatedView.isSearch){
          this.documents = updatedView.images.docs;
          this.pages = updatedView.images.pages;
        }
      })
    }

    buildAlbum() {
      this.images.getTabs()
        .subscribe((years: number[]) => {
          if (years.length > 0) {
            this.years = years.reverse();
            this.albumViewSelector['year'] = this.years[0];
            this.images.getTabs(this.years[0])
                .subscribe((months: number[]) => {
                  this.months = months;
                  this.albumViewSelector['month'] = this.months[this.months.length - 1];
                  let model = new MongoImageModel( null, this.years[0], this.months[this.months.length - 1] );
                  this.images.getView(model, this.currentPage, true)
                })
          }
        })
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
      this.images.getTabs( selector )
        .subscribe((months: any) => {
          this.months = months;
          this.albumViewSelector['month'] = this.months[this.months.length -1];
          let model = this.setModel(this.albumViewSelector['year'], this.albumViewSelector['month']);
          cb(model);
        })
    }

    getDocs ( model: MongoImageModel, page: number, doAnd: boolean ) {
      this.images.getView( model, page, doAnd )
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

    openEditor() : void {
      this.editor.setAssets(this.documents);
      this.editor.setDoEdit();
    }

    openModal(id: string): void {
      let index: number;

      this.documents.forEach((document, i) => {
        if(document._id == id) index = i;
      })
      this.modal.initialise(this.documents, index);
    }

}
