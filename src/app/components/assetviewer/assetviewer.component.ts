import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ImageServices } from "../../services/image.services";

@Component({
    selector: 'app-assetviewer',
    template: require('./assetviewer.component.pug'),
    styleUrls: ['./assetviewer.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class AssetviewerComponent implements OnInit {

    constructor(private imageService: ImageServices) {}

    ngOnInit():void {}

}