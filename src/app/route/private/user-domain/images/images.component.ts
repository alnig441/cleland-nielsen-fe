import { Component, OnInit, ViewEncapsulation, DoCheck } from "@angular/core";
import { MongoImageServices } from "../../../../services/mongoImage.services";
import { AuthenticationService } from "../../../../services/authentication.service";
import { MongoImageModel } from "../../../../models/mongoImage.model";
import { ServiceModelManagerService } from "../../../../services/service-model-manager.service";
import { ActivatedRoute } from "@angular/router";
import { SetMessageService } from "../../../../services/set-message.service";


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
    private editImages: any[] = new Array();
    private imageModel = new MongoImageModel();
    private imageList: string[] = new Array(6);
    private selectAll: boolean = false;
    private modalSource: string;

    constructor(
        private formManager: ServiceModelManagerService,
        private activatedRoute: ActivatedRoute,
        private activeUser: AuthenticationService,
        private mongoImageService: MongoImageServices,
        private message: SetMessageService
    ){}

    ngOnInit(): void {
      this.formManager.setService(this.activatedRoute.snapshot.url[0].path);
      this.currentPage = 1;
      this.buildAlbum();
    }

    ngDoCheck(): void {
    }

    buildAlbum() {
      this.mongoImageService.generateTabs()
          .then((years: number[]) => {
            if (years.length > 0) {
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
            }
            else {
              this.message.set({ status: 200, message: 'db currently empty'})
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

    openEditor() : void {
      this.editImages = this.documents;
    }

    clearEditor() : void {
      this.editImages = new Array();
      this.imageList = new Array(6);
      this.imageModel = new MongoImageModel();
      this.selectAll = false;
    }

    onSubmit() {
      let list = this.get_ids();
      this.doAnd = true;

      if (list.length > 1) {
        this.mongoImageService.updateMany(list, this.imageModel)
          .then(res => {
            this.message.set({ status: 200, message: 'update success'})
            this.getDocs(this.setModel(this.albumViewSelector['year'], this.albumViewSelector['month']), this.currentPage, this.doAnd);
          })
      }
      else if (list.length == 1){
        this.mongoImageService.updateOne(list[0], this.imageModel)
          .then(res => {
            this.message.set({status: 200, message: 'update success'})
            this.getDocs(this.setModel(this.albumViewSelector['year'], this.albumViewSelector['month']), this.currentPage, this.doAnd);
          })
      }

      this.imageList = new Array(6);
      this.imageModel = new MongoImageModel();
      this.selectAll = false;

    }



    onDelete() {
      let list = this.get_ids();

      if (list.length > 1) {
        this.mongoImageService.deleteMany(list)
          .then((result: any) => {
            console.log(result);
            this.clearEditor();
          })
      }
      else if (list.length == 1) {
        this.mongoImageService.deleteOne(list[0])
          .then((result: any) => {
            this.message.set({status: 200, message: 'photo deleted'});
            this.documents.length > 1 ?
              this.getDocs(this.setModel(this.albumViewSelector['year'], this.albumViewSelector['month']), this.currentPage, this.doAnd) :
              this.buildAlbum();
            this.clearEditor();
          })
      }

    }

    get_ids() {
      let ids = new Array();

      this.selectAll ?
        this.documents.forEach(doc => {
          ids.push(doc['_id']);
        }) :
        this.imageList.forEach((image, index) => {
          ids.push(this.documents[index]['_id']);
        }) ;

      return ids;
    }

    openModal(imageId: any):void {
      this.documents.forEach((document, index) => {
        if(document['_id'] == imageId){
          this.modalSource = 'photos/James/' + document['image']['fileName'];
          this.albumViewSelector['selectedIndex'] = index;
          $('.assetviewer-modal').modal('show');
        };
      })
    }

    cancelModal(): void {
        $('.assetviewer-modal').modal('hide');
        this.modalSource = undefined;
    }

    flipThroughImages(step: string): void {
      var length = this.documents.length;
      var imageIndex = this.albumViewSelector['selectedIndex'];

      switch(step) {
          case 'next':
              this.albumViewSelector['selectedIndex'] = imageIndex == length - 1 ?
                0 :
                this.albumViewSelector['selectedIndex'] + 1;
              break
          case 'previous':
              this.albumViewSelector['selectedIndex'] = imageIndex == 0 ?
                length - 1 :
                this.albumViewSelector['selectedIndex'] - 1;
              break
      }
      this.modalSource = 'photos/James/' + this.documents[this.albumViewSelector['selectedIndex']]['image']['fileName'];
    }
}
