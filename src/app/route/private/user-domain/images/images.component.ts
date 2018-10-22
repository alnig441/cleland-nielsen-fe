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
    private currentView: ImageModel[] = new Array();
    private years: any[] = new Array();
    private months: any[] = new Array();
    private activePeriod: object = new Object();

    constructor(private formManager: ServiceModelManagerService, private activatedRoute: ActivatedRoute, private activeUser: AuthenticationService, private imageService: ImageServices){}

    ngOnInit(): void {
        this.formManager.setService(this.activatedRoute.snapshot.url[0].path);
        this.imageService.getAll()
            .then((response) => {
                let array: any[] = [];
                this.imageService.images.forEach((year, tab) => {
                    if(year){
                        array.push(tab);
                    }
                })
                this.years = array.reverse();

                this.months = this.imageService.images[this.years[0]] as any;

                this.activePeriod['year'] = this.imageService.images.length -1;
                this.activePeriod['month'] = this.months.length -1;

                this.currentView = this.months[this.activePeriod['month']] as ImageModel[];
            });
    }

    setActivePeriod(x: any):void {

        if(x > 11){
            this.activePeriod['year'] = x;
            this.months = this.imageService.images[x] as any;
            this.activePeriod['month'] = this.months.length -1;
            this.currentView = this.imageService.images[x][this.activePeriod['month']] as ImageModel[];
        } else {
            this.activePeriod['month'] = x;
            this.currentView = this.imageService.images[this.activePeriod['year']][x];
        }
    }

}