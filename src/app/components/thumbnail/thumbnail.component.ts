import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ImageServices } from "../../services/image.services";
import { ImageModel } from "../../models/image.model";

@Component({
    selector: 'app-thumbnail',
    template: require('./thumbnail.component.pug'),
    encapsulation: ViewEncapsulation.None
})

export class ThumbnailComponent implements OnInit {

    private images: ImageModel[];

    constructor(private imageService: ImageServices){
        this.images = this.imageService.images;
    }

    ngOnInit(): void {
        console.log('thumbnail component init');
    }

}