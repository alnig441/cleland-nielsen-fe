import { Component, DoCheck, OnInit, ViewEncapsulation } from "@angular/core";
import { ImageServices } from "../../services/image.services";
import { ImageModel } from "../../models/image.model";

@Component({
    selector: 'app-thumbnail',
    template: require('./thumbnail.component.pug'),
    encapsulation: ViewEncapsulation.None
})

export class ThumbnailComponent implements OnInit, DoCheck {

    images: ImageModel[] = new Array();

    constructor(private imageService: ImageServices){}

    ngOnInit(): void {}

    ngDoCheck(): void {
        if(this.imageService.images){
            this.images = this.imageService.images;
        }
    }

}