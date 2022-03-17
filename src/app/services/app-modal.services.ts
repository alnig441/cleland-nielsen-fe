import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpErrorResponse } from "@angular/common/http";

import { AuthenticationServices } from "./authentication.services";
import { MongoImageServices } from "./mongoImage.services";
import { MongoVideoServices } from "./mongoVideo.services";
import { ServiceModelManagerServices } from "./service-model-manager.services";

import { Subject } from "rxjs";

@Injectable()

export class AppModalServices {

  private assets: any[];
  activeService: string;
  private source: string;
  private assetIndex: number;

  asset: any;
  model: any;
  service: any;

  activeAsset = new Subject();

  constructor(
    private activeUser: AuthenticationServices,
    private images: MongoImageServices,
    private videos: MongoVideoServices,
    private modelManager: ServiceModelManagerServices
  ) {
    this.modelManager.serviceReady.subscribe((service: string) => {
      this.activeService = service;
      this.service = this[service];
      this.model = this.modelManager.getRecordModel();
    })
    this.images.onUpdatedView.subscribe((updatedView: any) => {
      this.assets = updatedView.images.docs;
      if(updatedView.images.docs) {
        this.activeAsset.next(this.assets[this.assetIndex]);
      }
    })
    this.videos.onUpdatedView.subscribe((view: any) => {
      this.assets = view.docs;
      if(view.docs) {
        this.activeAsset.next(this.assets[this.assetIndex]);
      }
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

  setSource(index: any): void {
    let assetType = this.activeService == 'images' ? 'image' : 'video';
    let folder = this.activeService == 'images' ? 'photos' : this.activeService;
    if(this.activeUser.isGuest) {
      this.source = folder == 'photos' ?
        "photos/photoapp/private-no-access.jpeg" :
        "photos/photoapp/tv-test-screen.mp4" ;
    } else {
      this.source = `${folder}/James/${this.assets[index][assetType].fileName}`;
    }
    this.activeAsset.next(this.assets[index]);
    this.asset = this.assets[index];
    this.assetIndex = index;
  }

  getSource(): any {
    return this.source;
  }

  getAssets(): any {
    return this.assets;
  }

}
