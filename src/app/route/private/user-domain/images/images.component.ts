import { Component, OnInit, ViewEncapsulation, DoCheck } from "@angular/core";
import { ImageServices } from "../../../../services/image.services";
import { AuthenticationService } from "../../../../services/authentication.service";
import { ImageModel } from "../../../../models/image.model";
import { ServiceModelManagerService } from "../../../../services/service-model-manager.service";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'app-images',
    template: require('./images.component.pug'),
    styleUrls: ['./images.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ImagesComponent implements OnInit {

    private imageForm: ImageModel;
    private latest: ImageModel[] = new Array();

    constructor(private formManager: ServiceModelManagerService, private activatedRoute: ActivatedRoute, private activeUser: AuthenticationService, private imageService: ImageServices){}

    ngOnInit(): void {
        this.formManager.setService(this.activatedRoute.snapshot.url[0].path);
        this.imageService.getAll()
            .then((response) => {
                this.latest = this.imageService.images.slice(0,9);
                console.log(response);
            });

    }

}