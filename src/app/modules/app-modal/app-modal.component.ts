import { Component, OnInit, DoCheck, AfterContentInit, AfterViewInit, ViewEncapsulation, HostListener } from "@angular/core";
import { AuthenticationServices } from "../../services/authentication.services";
import { AppModalServices } from "../../services/app-modal.services";

const $ = require('jquery');

@Component({
  selector: 'app-modal',
  template: require('./app-modal.component.pug'),
  styleUrls: ['./app-modal.component.scss']
})

export class AppModalComponent {
  
   keyword: any;
   interval: any;
   inc: number = 0;
  
  constructor(
    private activeUser: AuthenticationServices,
    private modal:      AppModalServices,
  ) { 
    this.modal.activeAsset.subscribe((asset: any) => {
      let keywords = asset.meta.keywords;
      this.keyword = keywords.length > 0 ? keywords[this.inc] : undefined ;
      
      if (this.keyword) {
        
        this.interval = setInterval(() => {
          if(this.inc < asset.meta.keywords.length -1){
            this.inc++;
          }
          else{
            this.inc = Number(0);
          }
          this.keyword = asset.meta.keywords[this.inc];
        }, 1500, asset)
      }
      
    })
  }

  @HostListener('document:keyup', ['$event']) keyupHandler( event: KeyboardEvent) {
    if (event.key == 'Escape') {
      $('.assetviewer-modal').modal('hide');
      this.modal.clear();
      clearInterval(this.interval);
    }
  }
  
  @HostListener('click', ['$event']) clickHandler( event: MouseEvent) {
    if($(event.target).hasClass('assetviewer-modal')){ 
      clearInterval(this.interval)
    }
  }

  flip(direction: string): void {
    clearInterval(this.interval);
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
    clearInterval(this.interval);
    $('.assetviewer-modal').modal('hide');
    this.modal.clear();
  }

}
