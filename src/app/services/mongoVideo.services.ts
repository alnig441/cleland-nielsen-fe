import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { MongoVideoModel } from "../models/mongoVideo.model";
import 'rxjs/add/operator/toPromise';
import { AuthenticationService } from "./authentication.service";
import { SetMessageService } from "./set-message.service";

@Injectable()

export class MongoVideoServices {
  videos  : MongoVideoModel[] = new Array();
  videosUpdated : boolean = false;
  baseUrl = '/api';

  constructor(
    private message: SetMessageService,
    private http: HttpClient,
    private activeUser: AuthenticationService,
  ) {}

  generateTabs(year?: number): Promise<any> {

    if (this.activeUser.isAdmin || this.activeUser.isPermitted['to_view_videos']) {
      let params = new HttpParams();
      params = year ?
        params.append('year', year.toString()):
        params;

      return this.http.get(this.baseUrl + '/generate_tabs/Videos', { params : params , observe: 'body'})
        .toPromise()
        .then((res : any) => {
            return Promise.resolve(res);
        })
        .catch((error: any) => {
            this.message.set(error)
        })
    } else {
      this.message.set({ status: 403, statusText: 'Get Tabs'});
    }

  }

  search(form: MongoVideoModel, page?: any, doAnd?: boolean): Promise<any> {

    if (this.activeUser.isAdmin || this.activeUser.isPermitted['to_view_videos']) {
      let params = new HttpParams({ fromString: 'doAnd' });
      let keys = Object.keys(form);
      keys.forEach( key => {
        if ( form[key] || ( typeof form[key] == 'number' && form[key] == 0 ) ){
          params = params.append(key, form[key]);
        }
      })
      params = page ? params.append('page', page.toString()) : params;
      params = doAnd ? params.set('doAnd', 'yes') : params;

      return this.http.get(this.baseUrl + '/Search/Videos', { params : params , observe: 'body'})
        .toPromise()
        .then((res : any) => {
            return Promise.resolve(res);
        })
        .catch((error: any) => {
            this.message.set(error)
        })
    } else {
      this.message.set({ status: 403, statusText: 'Search Videos'});
    }

  }
}
