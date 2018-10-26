import { Component, OnInit, ViewEncapsulation, DoCheck } from "@angular/core";
import { ImageServices } from "../../../../services/image.services";
import { AuthenticationService } from "../../../../services/authentication.service";
import { ImageModel } from "../../../../models/image.model";
import { ServiceModelManagerService } from "../../../../services/service-model-manager.service";
import { ActivatedRoute } from "@angular/router";

const $ = require('jquery');

@Component({
    selector: 'app-images',
    template: require('./images.component.pug'),
    styleUrls: ['./images.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ImagesComponent implements OnInit, DoCheck {

    private imageForm: ImageModel;
    private currentView: ImageModel[] = new Array();
    private currentViewSubset: ImageModel[];
    private imageInformation : ImageModel;
    private years: any[] = new Array();
    private months: any[] = new Array();
    private activePeriod: object = new Object();
    private currentPage: number;
    private lastPage: number;

    constructor(private formManager: ServiceModelManagerService, private activatedRoute: ActivatedRoute, private activeUser: AuthenticationService, private imageService: ImageServices){}

    ngOnInit(): void {
        this.currentPage = 0;
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

                this.setActivePeriod();
                this.setCurrentViewSubset();
            });
    }

    ngDoCheck(): void {
    }

    selectPeriod(x: any):void {
        this.setActivePeriod(x);
    }

    setActivePeriod(x?: any): void {
        this.activePeriod['year'] = (!x && x !=0) ? this.imageService.images.length - 1 : x > 11 ? x : this.activePeriod['year'];
        this.months = this.imageService.images[this.activePeriod['year']] as any;
        this.activePeriod['month'] = ((!x && x != 0) || x > 11) ? this.months.length -1 : this.activePeriod['month'] = x ;
        this.currentView = this.months[this.activePeriod['month']] as ImageModel[];
        this.lastPage = Math.ceil(this.currentView.length / 6) - 1;
        this.setCurrentViewSubset();
    }

    turnPage(direction: string): void {
        direction == 'forward' ? (this.currentPage < this.lastPage ? this.currentPage++ : null) : (this.currentPage > 0 ? this.currentPage--: null);
        this.setCurrentViewSubset(direction);
    }

    setImageInfo(index?: any) : void {
        this.imageInformation = (index || index == 0) ? this.currentViewSubset[index] : null;
    }

    setCurrentViewSubset(next?: string) : void {
        this.currentViewSubset = next ? this.currentView.slice(this.currentPage * 6, this.currentPage * 6 + 6) : this.currentView.slice(0, 6);
    }

    openModal(imageId: any):void {

        this.currentView.forEach((image, index) => {
            if(image['id'] == imageId){
                this.activePeriod['selected'] = index;
                $('.assetviewer-modal').modal('show');
            };
        })

    }

    cancelModal(): void {
        $('.assetviewer-modal').modal('hide');
    }

    goToImage(step: string): void {

        var length = this.imageService.images[this.activePeriod['year']][this.activePeriod['month']].length;

        switch(step) {
            case 'next':
                this.activePeriod['selected'] = this.activePeriod['selected'] == length - 1 ? 0 : this.activePeriod['selected'] + 1;
                break
            case 'previous':
                this.activePeriod['selected'] = this.activePeriod['selected'] == 0 ? length - 1 : this.activePeriod['selected'] - 1;
                break
        }


        console.log('target: ', this.currentView[this.activePeriod['selected']]['id']);

    }
}