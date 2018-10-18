import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ImageModel } from "../models/image.model";
import 'rxjs/add/operator/toPromise';
import { ErrorParser } from "./error-parser";
import { AuthenticationService } from "./authentication.service";
import { SetMessageService } from "./set-message.service";

@Injectable()

export class ImageServices {

    errorParser = new ErrorParser();
    images: ImageModel[] = new Array();
    imagesUpdated: boolean = false;
    baseUrl = '/imagesDb';
    
    constructor(private message: SetMessageService, private http: HttpClient, private activeUser: AuthenticationService) {}

    getAll(): Promise<any> {
        if(!this.activeUser.isPermitted['to_view_images']){
            this.message.set({ status: 405, message: 'insufficient permissions'});        }
        else{
            return this.http.get(this.baseUrl, { observe: "response"})
                .toPromise()
                .then(res => {
                    this.images = res.body as ImageModel[];
                    this.imagesUpdated = true;

                    return Promise.resolve('success');
                })
                .catch(this.errorParser.handleError);
        }

    }

    getTabInfo(): Promise<any> {
        if(!this.activeUser.isPermitted['to_view_images']){
            this.message.set({ status: 405, message: 'insufficient permissions'});
        }
        else{
            return this.http.get(this.baseUrl + '/tabs', {observe: "response"})
                .toPromise()
                .then(res => {
                    return Promise.resolve(res);
                })
                .catch(this.errorParser.handleError);
        }
    }

    getOne(): Promise<any> {
        if(!this.activeUser.isPermitted['to_view_images']){
            this.message.set({ status: 405, message: 'insufficient permissions'});
        }

        return Promise.reject({ status: '', message: 'method not yet defined'})
            .catch((result: any) => {
                this.message.set(result);
            })

    }

    getLatest(): Promise<any> {
        if(!this.activeUser.isPermitted['to_view_images']){
            this.message.set({ status: 405, message: 'insufficient permissions'});
        }

        return Promise.reject({ status: '', message: 'method not yet defined'})
            .catch((result: any) => {
                this.message.set(result);
            })

    }

    getList(): Promise<any> {
        if(!this.activeUser.isPermitted['to_view_images']){
            this.message.set({ status: 405, message: 'insufficient permissions'});
        }

        return Promise.reject({ status: '', message: 'method not yet defined'})
            .catch((result: any) => {
                this.message.set(result);
            })


    }

    addRecord(): Promise<any> {
        if(!this.activeUser.isPermitted['to_add_images']){
            this.message.set({ status: 405, message: 'insufficient permissions'});
        }
        else {
            return Promise.reject({ status: '', message: 'method not yet defined'})
        }
    }

    deleteRecord(): Promise<any> {
        if(!this.activeUser.isPermitted['to_delete_images']){
            this.message.set({ status: 405, message: 'insufficient permissions'});
        }
        else {
            return Promise.reject({ status: '', message: 'method not yet defined'})
        }
    }

    editRecord(): Promise<any> {
        if(!this.activeUser.isPermitted['to_edit_images']){
            this.message.set({ status: 405, message: 'insufficient permissions'});
        }
        else {
            return Promise.reject({ status: '', message: 'method not yet defined'})
        }
    }
}
