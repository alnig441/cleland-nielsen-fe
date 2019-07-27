import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { AuthenticationService } from "../../../../services/authentication.service";
import { ServiceModelManagerService } from "../../../../services/service-model-manager.service";
import { MongoVideoServices } from "../../../../services/mongoVideo.services";
import { MongoVideoModel } from "../../../../models/mongoVideo.model";
import { ActivatedRoute } from "@angular/router";
import { SetMessageService } from "../../../../services/set-message.service";

const $ = require('jquery');

@Component({
    selector: 'app-videos',
    template: require('./videos.component.pug'),
    styleUrls: ['./videos.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class VideosComponent implements OnInit {

  private albumViewSelector: object = new Object();
  // private showVideoInformation: any[] = new Array();
  private years: number[] = new Array();
  private months: number[] = new Array();
  private currentPage: number;
  private doAnd: boolean = false;
  private pages: number;
  private total: number;
  private documents: any[] = new Array();
  private editVideos: any[] = new Array();
  private videoModel = new MongoVideoModel();
  // private videoList: string[] = new Array(6);
  private selectAll: boolean = false;
  private modalSource: string;

  constructor(
    private formManager: ServiceModelManagerService,
    private activeUser: AuthenticationService,
    private activatedRoute: ActivatedRoute,
    private mongoVideoService: MongoVideoServices,
    private message: SetMessageService
  ){}

  ngOnInit(): void {
    this.years = [];
    this.formManager.setService(this.activatedRoute.snapshot.url[0].path);
    this.currentPage = 1;
    this.buildAlbum();
  }

  buildAlbum() {
    this.mongoVideoService.generateTabs()
        .then((years: number[]) => {
          if (years.length > 0) {
            console.log('years: ', years);
            this.years = years.reverse();
            this.albumViewSelector['year'] = this.years[0];
            this.mongoVideoService.generateTabs(this.years[0])
                .then((months: number[]) => {
                  console.log('months: ', months);
                  this.months = months;
                  this.albumViewSelector['month'] = this.months[this.months.length - 1];
                  let model = new MongoVideoModel( null, this.years[0], this.months[this.months.length - 1] );
                  this.mongoVideoService.search(model, this.currentPage, true)
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
      this.getTabs(selector, ( model: MongoVideoModel ) => {
        this.getDocs( model, this.currentPage, this.doAnd );
      })
    }

    else {
      this.albumViewSelector['month'] = selector;
      let model = this.setModel(this.albumViewSelector['year'], selector);
      this.getDocs( model, this.currentPage, this.doAnd );
    }
  }

  getTabs ( selector: number, cb: any ) {
    this.mongoVideoService.generateTabs( selector )
      .then((months: any) => {
        this.months = months;
        this.albumViewSelector['month'] = this.months[this.months.length -1];
        let model = this.setModel(this.albumViewSelector['year'], this.albumViewSelector['month']);
        cb(model);
      })
  }

  getDocs ( model: MongoVideoModel, page: number, doAnd: boolean ) {
    this.mongoVideoService.search( model, page, doAnd )
      .then((body: any) => {
        this.pages = body.pages;
        this.total = body.total;
        this.documents = body.docs;
      })
  }

  setModel ( year: number, month: number ) {
    return new MongoVideoModel( null, year, month );
  }

  openModal(videoId: any):void {
    this.documents.forEach((document, index) => {
      if(document['_id'] == videoId){
        this.modalSource = 'videos/' + document['video']['fileName'];
        this.albumViewSelector['selectedIndex'] = index;
        $('.video-modal').modal('show');
      };
    })
  }

  cancelModal(): void {
      $('.video-modal').modal('hide');
      this.modalSource = undefined;
  }

  openEditor() : void {
    this.editVideos = this.documents;
  }
}
