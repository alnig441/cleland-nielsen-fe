import { Injectable } from "@angular/core";
import { ServiceModelManagerService } from "./service-model-manager.service";
import { MongoImageServices } from "./mongoImage.services";
import { MongoVideoServices } from "./mongoVideo.services";

@Injectable()

export class AppEditorServices {

  private selection: any = new Array();
  private assets: any;
  private service: any;
  private model: any;
  private doEdit: string;
  private selectAll: boolean = false;
  private getIds(){
    let ids = new Array();
    if(this.selectAll){
      this.assets.forEach((elem: object) => {
        ids.push(elem['_id']);
      })
    }
    else {
      ids = Object.keys(this.selection);
    }
    return ids.length == 0 ? null: ids;
  };

  constructor(
    private models: ServiceModelManagerService,
    private images: MongoImageServices,
    private videos: MongoVideoServices
    ) {
      this.models.serviceReady.subscribe(service => {
        if(service) {
          switch(service) {
            case "images":
              this.service = this.images;
              break;
            case "videos":
              this.service = this.videos;
              break;
          }
          this.model = this.models.getRecordModel();
        }
      })
      this.images.onUpdatedView.subscribe((view: any) => {
        this.assets = view.docs;
      })
    }

  setDoEdit(): void {
    this.doEdit = 'open';
  }

  setAssets(assets: any): void {
    this.assets = assets;
  }

  onSubmit(): void {
    let assetIds = this.getIds();

    if(assetIds){
      this.service.update(assetIds, this.model)
      this.models.initializeRecordModel();
      this.selection = new Array();
      this.selectAll = false;
    }

  }

  onDelete(): void {
    console.log('deleting assets: ', this.selection)
    let assetIds = this.getIds();
    
    if(assetIds){
      this.service.delete(assetIds);
      this.models.initializeRecordModel();
      this.selection = new Array();
      this.selectAll = false;
    }
  }

  onCancel(): void {
    this.models.initializeRecordModel();
    this.doEdit = null;
    this.assets = null;
    this.selection = new Array();
    this.selectAll = false;
  }


}
