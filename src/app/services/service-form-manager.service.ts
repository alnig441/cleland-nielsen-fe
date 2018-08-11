import { Injectable } from "@angular/core";
import { UserModel } from "../models/user.model";
import { AccountModel } from "../models/account.model";
import { PermissionModel } from "../models/permission.model";
import {ImageModel} from "../models/image.model";

@Injectable()

export class ServiceFormManagerService {

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
        }

        if(this.recordModel){
            this.formProperties = Object.keys(this.recordModel);
        }
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

    setRecordModelProperty(property: string, value: any) {
        if(property == 'account_permissions'){
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