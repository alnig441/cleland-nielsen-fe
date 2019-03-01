import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HttpParams } from "@angular/common/http";
import { MongoImageModel } from "../models/mongoImage.model";
import 'rxjs/add/operator/toPromise';
import { ErrorParser } from "./error-parser";
import { AuthenticationService } from "./authentication.service";
import { SetMessageService } from "./set-message.service";

@Injectable()

export class MongoImageServices {

  errorParser = new ErrorParser();
  images: MongoImageModel[] = new Array();
  imagesUpdated: boolean = false;
  baseUrl = '/api';

  constructor(private message: SetMessageService, private http: HttpClient, private activeUser: AuthenticationService) {}

  generateTabs(year?: any): Promise<any> {
    console.log('generateTabs ', year, typeof year);
    if(!this.activeUser.isPermitted['to_view_images']){
        this.message.set({ status: 405, message: 'insufficient permissions'});
    }
    else{
      let params = new HttpParams();
      params = year ? params.append('year', year): params;

      console.log('show me params: ', year, params.toString(), params.keys());
      // let endpoint = year ? `/generate_tabs?year=${year}` : '/generate_tabs';
          return this.http.get(this.baseUrl + '/generate_tabs?', { params : params , observe: 'body'})
        // return this.http.get(this.baseUrl + endpoint, { observe: 'body'})
            .toPromise()
            .then((res : any) => {
                return Promise.resolve(res);
            })
            .catch(this.errorParser.handleError)
            .catch((error: any) => {
                this.message.set(error)
            })
    }
  }
}
