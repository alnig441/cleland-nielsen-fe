import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpErrorResponse } from "@angular/common/http";

import { MongoImageServices } from "./mongoImage.services";
import { MongoVideoServices } from "./mongoVideo.services";
import { ServiceModelManagerServices } from "./service-model-manager.services";

import { Subject } from "rxjs";

@Injectable()

export class AppModalServices {

  private assets: any[];
  private service: any;
  private activeService: string;
  private source: string;

  activeAsset = new Subject();

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
    this.source = null ;
  }

  setSource(index: number): void {
    let assetType = this.activeService == 'images' ? 'image' : 'video';
    let folder = this.activeService == 'images' ? 'photos' : this.activeService;
    this.source = `${folder}/James/${this.assets[index][assetType].fileName}`;
    this.activeAsset.next(this.assets[index]);
  }

  getSource(): any {
    return this.source;
  }

  getAssets(): any {
    return this.assets;
  }

}
