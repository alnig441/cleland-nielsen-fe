import { Component, OnInit, AfterContentInit, AfterViewInit, ViewEncapsulation, HostListener } from "@angular/core";
import { AuthenticationService } from "../../services/authentication.service";
import { MongoImageServices } from "../../services/mongoImage.services";

const $ = require('jquery');

@Component({
  selector: 'app-modal',
  template: require('./app-modal.component.pug'),
  styleUrls: ['./app-modal.component.scss']
})

export class AppModalComponent implements OnInit, AfterContentInit, AfterViewInit {

  private modalSource: any;

  constructor(
    private activeUser: AuthenticationService,
    private mongoImageService: MongoImageServices
  ) {}

  @HostListener('click', ['$event']) clickHandler( event: MouseEvent ) {
  }

  @HostListener('document:keyup', ['$event']) keyupHandler( event: KeyboardEvent) {

    if (event.key == 'Escape') {
      $('.assetviewer-modal').modal('hide');
      this.mongoImageService.clearModal();
    }

  }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
  }

  ngAfterViewInit(): void {
  }

  flip(direction: string): void {
    
    let assets = this.mongoImageService.getModalAssets();
    let source = this.mongoImageService.getModalSource();
    let currentImage = source.split('/')[2];
    let length = assets.length;
    let index: number;

    assets.forEach(( asset: any, i: number ) => {
      if (asset.image.fileName == currentImage) {
        index = i;
      }
    })

    switch(direction) {
      case 'next':
        index == length - 1 ? index = 0 : index ++ ;
        break;
      case 'previous':
        index == 0 ? index = length - 1 : index --;
        break;
    }
    this.mongoImageService.setModalSource(index);
  }

  cancelModal(): void {
    $('.assetviewer-modal').modal('hide');
    this.mongoImageService.clearModal();
  }

}
