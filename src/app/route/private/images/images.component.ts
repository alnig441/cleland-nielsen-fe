import { Component, DoCheck, OnInit, ViewEncapsulation } from "@angular/core";
import { ImageServices } from "../../../services/image.services";
import { ImageModel } from "../../../models/image.model";

@Component({
    selector: 'app-images',
    template: require('./images.component.pug'),
    styleUrls: ['./images.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ImagesComponent implements OnInit {

    images: ImageModel[] = new Array();

    constructor(private imageService: ImageServices){}

    ngOnInit(): void {
        console.log('images comp init', this.imageService);

        this.imageService.getLatest()
    }

}