import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpErrorResponse } from "@angular/common/http";

import { MongoImageServices } from "./mongoImage.services";
import { MongoVideoServices } from "./mongoVideo.services";
import { ServiceModelManagerServices } from "./service-model-manager.services";

@Injectable()

export class AppModalServices {

  private assets: any[];
  private service: any;
  private activeService: string;
  private modalSource: string;

  constructor(
    private images: MongoImageServices,
    private videos: MongoVideoServices,
    private modelManager: ServiceModelManagerServices
  ) {
    this.modelManager.serviceReady.subscribe((service: string) => {
      this.activeService = service;
      this.service = this[service];
    })
    this.images.onUpdatedView.subscribe((view: any) => {
      this.assets = view.docs;
    })
    this.videos.onUpdatedView.subscribe((view: any) => {
      this.assets = view.docs;
    })
  }

  initialise(assets: any, index: number ): void {
    this.assets = assets;
    this.setSource(index);
  }

  clear(): void {
    this.assets = null;
    this.modalSource = null ;
  }

  setSource(index: number): void {
    let assetType = this.activeService == 'images' ? 'image' : 'video';
    let folder = this.activeService == 'images' ? 'photos' : this.activeService;
    this.modalSource = `${folder}/James/${this.assets[index][assetType].fileName}`;
  }

  getSource(): any {
    return this.modalSource;
  }

  getAssets(): any {
    return this.assets;
  }

}
