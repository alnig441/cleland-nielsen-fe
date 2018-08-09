import { Injectable } from "@angular/core";
import { UserModel } from "../models/user.model";
import { AccountModel } from "../models/account.model";
import { PermissionModel } from "../models/permission.model";
import {ImageModel} from "../models/image.model";

@Injectable()

export class ServiceFormManagerService {

    private service: string;
    private itemForm: any;
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
                this.itemForm = new UserModel('uuid_generate_v4()');
                break;
            case 'accounts':
                this.itemForm = new AccountModel('uuid_generate_v4()');
                this.itemForm['account_permissions'] = new Array();
                break;
            case 'permissions':
                this.itemForm = new PermissionModel('uuid_generate_v4()');
                break;
            case 'images':
                this.itemForm = new ImageModel();
                break;
        }

        if(this.itemForm){
            this.formProperties = Object.keys(this.itemForm);
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

    getItemForm(): any {
        return this.itemForm;
    }

    setItemFormProperty(property: string, value: any) {
        if(property == 'account_permissions'){
            this.itemForm[property].push(value);
        }
        else{
            this.itemForm[property] = value;
        }
    }

    getItemFormProperty(property: string): any{
        return this.itemForm[property];
    }
}