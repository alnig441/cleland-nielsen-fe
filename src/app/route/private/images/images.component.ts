import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ImageServices } from "../../../services/image.services";

@Component({
    selector: 'app-images',
    template: require('./images.component.pug'),
    styleUrls: ['./images.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ImagesComponent implements OnInit {

    constructor(private imageService: ImageServices){}

    ngOnInit(): void {
    }

}