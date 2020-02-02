import { Component, OnInit, DoCheck, AfterContentInit, AfterViewInit, ViewEncapsulation, HostListener } from "@angular/core";
import { NgClass } from "@angular/common";
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
   inc: number;
   keywords: any;
   ticker: any;
  
  constructor(
    private activeUser: AuthenticationServices,
    private modal:      AppModalServices,
  ) { 
    this.modal.activeAsset.subscribe((asset: any) => {  
      this.inc = 0;
      let keywords = asset.meta.keywords;
      this.keywords = asset.meta.keywords;
      if(this.keywords.length > 0){
        this.setKeyword();
      }
    })
  }


  @HostListener('transitionend', ['$event']) handler(event: TransitionEvent) {    
    let keywordsIsEmpty = this.keywords.length > 0 ? false : true;
    let type = null;
        
    switch(event.elapsedTime) {
      case 0.15:
        type = 'modal';
        break;
      case 0.5:
        type = 'keyword_begin';
        break;
      case 1.5:
        type = 'keyword_end';
        break;
      default:
        type = null;
        break;
    }    
        
    if(!keywordsIsEmpty && type == 'keyword_end'){
      this.setKeyword();
    }
    
    if( type != 'keyword_end') {
      setTimeout(() => {
        $('#keyword').removeClass('begin');
      }, 500)
    }
  }

  @HostListener('document:keyup', ['$event']) keyupHandler( event: KeyboardEvent) {
    if (event.key == 'Escape') {
      $('.assetviewer-modal').modal('hide');
      this.modal.clear();
      this.keyword = null;
    }
  }
  
  @HostListener('click', ['$event']) clickHandler(event: MouseEvent) {
    if ($(event.target).hasClass('assetviewer-modal')) {
      this.modal.clear();
      this.keyword = null;
    }
  }
  
  setKeyword() {
    this.keyword = this.keywords[this.inc];
    $('#ticker p').addClass('begin');
    this.inc = (this.inc == this.keywords.length - 1) ? 0 : this.inc+=1 ;
  }

  flip(direction: string, event: any): void {
    
    this.keyword = null;
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
    this.keyword = null;
  }

}
