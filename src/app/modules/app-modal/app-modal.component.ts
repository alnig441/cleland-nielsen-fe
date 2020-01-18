import { Component, OnInit, AfterContentInit, AfterViewInit, ViewEncapsulation, HostListener } from "@angular/core";
import { AuthenticationService } from "../../services/authentication.service";
import { MongoImageServices } from "../../services/mongoImage.services";
import { MongoVideoServices } from "../../services/mongoVideo.services";
import { ServiceModelManagerService } from "../../services/service-model-manager.service";

const $ = require('jquery');

@Component({
  selector: 'app-modal',
  template: require('./app-modal.component.pug'),
  styleUrls: ['./app-modal.component.scss']
})

export class AppModalComponent implements OnInit {

  private modalSource: any;
  private activeService: string;
  private service: any; 

  constructor(
    private activeUser: AuthenticationService,
    private images: MongoImageServices,
    private videos: MongoVideoServices,
    private models: ServiceModelManagerService,
  ) {}

  @HostListener('click', ['$event']) clickHandler( event: MouseEvent ) {
  }

  @HostListener('document:keyup', ['$event']) keyupHandler( event: KeyboardEvent) {

    if (event.key == 'Escape') {
      $('.assetviewer-modal').modal('hide');
      this.service.clearModal();
    }

  }

  ngOnInit(): void {
    this.models.serviceReady.subscribe((service: string) => {
      this.activeService = service;
      this.service = this[service];
    })
  }

  flip(direction: string): void {
    
    let assets = this.service.getModalAssets();
    let source = this.service.getModalSource();
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
    this.service.setModalSource(index);
  }

  cancelModal(): void {
    $('.assetviewer-modal').modal('hide');
    this.service.clearModal();
  }

}
