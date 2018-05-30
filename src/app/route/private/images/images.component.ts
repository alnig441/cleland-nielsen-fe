import { Component, OnInit, ViewEncapsulation} from "@angular/core";

@Component({
    selector: 'app-images',
    template: require('./images.component.pug'),
    encapsulation: ViewEncapsulation.None
})

export class ImagesComponent implements OnInit {
    constructor(){}

    ngOnInit(): void {
        console.log('images comp init');
    }
}