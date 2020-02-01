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
   interval: any;
   inc: number = 0;
   keywords: any;
  
  constructor(
    private activeUser: AuthenticationServices,
    private modal:      AppModalServices,
  ) { 
    this.modal.activeAsset.subscribe((asset: any) => {      
      let keywords = asset.meta.keywords;
      this.keywords = asset.meta.keywords;
      this.keyword = keywords.length > 0 ? keywords[this.inc] : undefined ;
    })
  }

  @HostListener('transitionend', ['$event']) handler(event: TransitionEvent) {    
    let id = $(event.target).attr('id');
    let keywordsIsEmpty = this.keywords.length > 0 ? false : true;
    
    let type = !id ? 
      'modal':
      event.elapsedTime == 0.5 ?
        'keyword_begin':
        'keyword_end';
    
    if(!keywordsIsEmpty && type != 'keyword_begin'){
      switch(type){
        case 'modal':
          $('#ticker p').addClass('begin');
          break;
        case 'keyword_end':
          this.setKeyword();
          break;
      }
    }
    
    if( type == 'keyword_begin' ) {
      setTimeout(() => {
        $(event.target).removeClass('begin');
      }, 500)
    }
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
  
  setKeyword() {
    this.inc = (this.inc == this.keywords.length - 1) ? 0 : this.inc+=1 ;
    this.keyword = this.keywords[this.inc];
    $('#ticker p').addClass('begin');
  }

  flip(direction: string): void {
    clearInterval(this.interval);
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
    clearInterval(this.interval);
    $('.assetviewer-modal').modal('hide');
    this.modal.clear();
  }

}
