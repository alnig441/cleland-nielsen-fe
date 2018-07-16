import { Component, OnInit, ViewEncapsulation} from "@angular/core";
import { ImageServices } from "../../../services/image.services";

@Component({
    selector: 'app-images',
    template: require('./images.component.pug'),
    encapsulation: ViewEncapsulation.None
})

export class ImagesComponent implements OnInit {

    constructor(private imageService: ImageServices){}

    ngOnInit(): void {
        console.log('images comp init');

        this.getAllImages();

    }

    getAllImages() {
        this.imageService.getAll()
            .subscribe(images => {
                console.log('image comp getting all images from image services: ', images)
            })
    }

}