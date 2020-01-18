import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { AuthenticationService } from "../../../../services/authentication.service";
import { ServiceModelManagerService } from "../../../../services/service-model-manager.service";
import { MongoVideoServices } from "../../../../services/mongoVideo.services";
import { MongoVideoModel } from "../../../../models/mongoVideo.model";
import { ActivatedRoute } from "@angular/router";
import { AppEditorServices } from "../../../../services/app-editor.services";

const $ = require('jquery');

@Component({
    selector: 'app-videos',
    template: require('./videos.component.pug'),
    styleUrls: ['./videos.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class VideosComponent implements OnInit {

  private albumViewSelector: object = new Object();
  private years: number[] = new Array();
  private months: number[] = new Array();
  private currentPage: number;
  private doAnd: boolean = false;
  private pages: number;
  private documents: any[] = new Array();
  private editVideos: any[] = new Array();
  private videoModel = new MongoVideoModel();
  private modalSource: string;

  constructor(
    private formManager: ServiceModelManagerService,
    private activeUser: AuthenticationService,
    private activatedRoute: ActivatedRoute,
    private videos: MongoVideoServices,
    private editor: AppEditorServices
  ){}

  ngOnInit(): void {
    this.years = [];
    this.formManager.setService(this.activatedRoute.snapshot.url[0].path);
    this.currentPage = 1;
    this.buildAlbum();
    this.videos.onUpdatedView.subscribe((videos: any) => {
      this.documents = videos.docs;
    })
  }

  buildAlbum() {
    this.videos.getTabs()
        .subscribe((years: number[]) => {
          if (years.length > 0) {
            this.years = years.reverse();
            this.albumViewSelector['year'] = this.years[0];
            this.videos.getTabs(this.years[0])
                .subscribe((months: number[]) => {
                  this.months = months;
                  this.albumViewSelector['month'] = this.months[this.months.length - 1];
                  let model = new MongoVideoModel( null, this.years[0], this.months[this.months.length - 1] );
                  this.videos.getView(model, this.currentPage, true)
                })
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
    this.videos.getTabs( selector )
      .subscribe((months: any) => {
        this.months = months;
        this.albumViewSelector['month'] = this.months[this.months.length -1];
        let model = this.setModel(this.albumViewSelector['year'], this.albumViewSelector['month']);
        cb(model);
      })
  }

  getDocs ( model: MongoVideoModel, page: number, doAnd: boolean ) {
    this.videos.getView( model, page, doAnd )
  }

  setModel ( year: number, month: number ) {
    return new MongoVideoModel( null, year, month );
  }

  openModal(id: string): void {
    let index: number;

    this.documents.forEach((document, i) => {
      if(document._id == id) index = i;
    })
    this.videos.initialiseModal(this.documents, index);
  }
  
  openEditor() : void {
    this.editor.setAssets(this.documents);
    this.editor.setDoEdit();
  }

}
