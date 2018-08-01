import { Component, OnInit, ViewEncapsulation, DoCheck } from "@angular/core";
import { ImageServices } from "../../../services/image.services";
import { HttpAuthService } from "../../../services/httpAuth.service";
import { ImageModel } from "../../../models/image.model";
import { ErrorParser } from "../../../services/errorParser";
import { CompInitService } from "../../../services/comp-init.service";

@Component({
    selector: 'app-images',
    template: require('./images.component.pug'),
    styleUrls: ['./images.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ImagesComponent implements OnInit {

    private imageForm: ImageModel;
    errorParser = new ErrorParser();

    constructor(private compInit: CompInitService, private activeUser: HttpAuthService, private imageService: ImageServices){}

    ngOnInit(): void {
        if(this.activeUser.isPermitted['to_view_images']){
            this.compInit.initialize('images')
                .then((result: any) => {
                    console.log('image comp init ', result);
                })
        }
    }
}