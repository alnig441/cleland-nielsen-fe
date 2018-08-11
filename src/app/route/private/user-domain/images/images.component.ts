import { Component, OnInit, ViewEncapsulation, DoCheck } from "@angular/core";
import { ImageServices } from "../../../../services/image.services";
import { HttpAuthService } from "../../../../services/httpAuth.service";
import { ImageModel } from "../../../../models/image.model";
import { ErrorParser } from "../../../../services/errorParser";
import { CompInitService } from "../../../../services/comp-init.service";
import { ServiceFormManagerService } from "../../../../services/service-form-manager.service";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'app-images',
    template: require('./images.component.pug'),
    styleUrls: ['./images.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ImagesComponent implements OnInit {

    private imageForm: ImageModel;
    errorParser = new ErrorParser();

    constructor(private formManager: ServiceFormManagerService, private activatedRoute: ActivatedRoute, private compInit: CompInitService, private activeUser: HttpAuthService, private imageService: ImageServices){}

    ngOnInit(): void {
        if(this.activeUser.isPermitted['to_view_images']){
            this.compInit.initialize('images')
                .then((result: any) => {
                    console.log('image comp init ', result);
                    this.formManager.setService(this.activatedRoute.snapshot.url[0].path);
                })
        }
    }
}