import { Component, OnInit, DoCheck, ViewEncapsulation } from "@angular/core";
import { ImageServices } from "../../services/image.services";

@Component({
    selector: "app-messagebar",
    template: require('./messagebar.component.pug'),
    encapsulation: ViewEncapsulation.None
})

export class MessagebarComponent implements OnInit {

    error: any;

    constructor(private images: ImageServices){}

    ngOnInit(): void {
        console.log('messagebar comp init');
    }

}