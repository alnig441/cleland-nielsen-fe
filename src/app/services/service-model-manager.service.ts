import { Injectable } from "@angular/core";
import { UserModel } from "../models/user.model";
import { AccountModel } from "../models/account.model";
import { PermissionModel } from "../models/permission.model";
import { ImageModel } from "../models/image.model";
import { MongoImageModel } from "../models/mongoImage.model";

@Injectable()

export class ServiceModelManagerService {

    private service: string;
    private recordModel: any;
    private formProperties: any;
    private languages =[
        {
            language: 'english'
        },
        {
            language: 'danish'
        }
    ]

    constructor() {

    }

    setService(service: string) {
        this.service = service;
        this.initializeRecordModel(service);
    }

    getService(): string {
        return this.service;
    }

    getLanguages(): any {
        return this.languages;
    }

    getProperties(): string[] {
        return this.formProperties;
    }

    getRecordModel(): any {
        return this.recordModel;
    }

    initializeRecordModel(service?: string) {

        service ? service = service : service = this.getService();

        switch (service) {
            case 'users':
                this.recordModel = new UserModel('uuid_generate_v4()');
                break;
            case 'accounts':
                this.recordModel = new AccountModel('uuid_generate_v4()');
                this.recordModel['account_permissions'] = new Array();
                break;
            case 'permissions':
                this.recordModel = new PermissionModel('uuid_generate_v4()');
                break;
            case 'images':
                this.recordModel = new ImageModel();
                break;
            default:
                this.recordModel = '';
                break;
        }

        if(this.recordModel){
            this.formProperties = Object.keys(this.recordModel);
        }
    }

    setRecordModelProperty(property: string, value: any) {
        if(Array.isArray(this.recordModel[property])){
            this.recordModel[property].push(value);
        }
        else{
            this.recordModel[property] = value;
        }
    }

    getRecordModelProperty(property: string): any{
        return this.recordModel[property];
    }
}
