import { Component, OnInit, AfterContentInit, AfterViewInit, ViewEncapsulation, HostListener } from "@angular/core";
import { AuthenticationServices } from "../../services/authentication.services";
import { AppModalServices } from "../../services/app-modal.services";

const $ = require('jquery');

@Component({
  selector: 'app-modal',
  template: require('./app-modal.component.pug'),
  styleUrls: ['./app-modal.component.scss']
})

export class AppModalComponent {

  constructor(
    private activeUser: AuthenticationServices,
    private modal:      AppModalServices,
  ) {}

  @HostListener('document:keyup', ['$event']) keyupHandler( event: KeyboardEvent) {
    if (event.key == 'Escape') {
      $('.assetviewer-modal').modal('hide');
      this.modal.clear();
    }
  }

  flip(direction: string): void {
    
    let assets = this.modal.getAssets();
    let source = this.modal.getSource();
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
    this.modal.setSource(index);
  }

  cancelModal(): void {
    $('.assetviewer-modal').modal('hide');
    this.modal.clear();
  }

}
