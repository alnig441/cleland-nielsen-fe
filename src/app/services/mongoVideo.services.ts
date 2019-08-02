import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { MongoVideoModel } from "../models/mongoVideo.model";
import 'rxjs/add/operator/toPromise';
import { ErrorParser } from "./error-parser";
import { AuthenticationService } from "./authentication.service";
import { SetMessageService } from "./set-message.service";

@Injectable()

export class MongoVideoServices {
  videos  : MongoVideoModel[] = new Array();
  errorParser = new ErrorParser();
  videosUpdated : boolean = false;
  baseUrl = '/api';

  constructor(
    private message: SetMessageService,
    private http: HttpClient,
    private activeUser: AuthenticationService,
  ) {}

  generateTabs(year?: number): Promise<any> {

    if (this.activeUser.isAdmin || this.activeUser.isPermitted['to_view_videos']) {
      let params = new HttpParams({ fromString: 'endpoint'});
      params = params.set('endpoint', 'Videos');
      params = year ?
        params.append('year', year.toString()):
        params;

      return this.http.get(this.baseUrl + '/generate_tabs?', { params : params , observe: 'body'})
        .toPromise()
        .then((res : any) => {
            return Promise.resolve(res);
        })
        .catch(this.errorParser.handleError)
        .catch((error: any) => {
            this.message.set(error)
        })
    } else {
      this.message.set({ status: 405, message: 'insufficient permissions'});
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

      return this.http.get(this.baseUrl + '/videos', { params : params , observe: 'body'})
        .toPromise()
        .then((res : any) => {
            return Promise.resolve(res);
        })
        .catch(this.errorParser.handleError)
        .catch((error: any) => {
            this.message.set(error)
        })
    } else {
      this.message.set({ status: 405, message: 'insufficient permissions'});
    }

  }
}
