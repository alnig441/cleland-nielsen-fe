import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ImageServices } from "../../services/image.services";

@Component({
    selector: 'app-images-thumbnail',
    template: require('./images-thumbnail.component.pug'),
    encapsulation: ViewEncapsulation.None
})

export class ImagesThumbnailComponent implements OnInit {

    constructor(private imageService: ImageServices){}

    ngOnInit(): void {
    }

}