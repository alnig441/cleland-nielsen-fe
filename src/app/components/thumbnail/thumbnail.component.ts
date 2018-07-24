import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ImageServices } from "../../services/image.services";

@Component({
    selector: 'app-thumbnail',
    template: require('./thumbnail.component.pug'),
    encapsulation: ViewEncapsulation.None
})

export class ThumbnailComponent implements OnInit {

    constructor(private imageService: ImageServices){}

    ngOnInit(): void {
        this.imageService.getLatest();
    }

}