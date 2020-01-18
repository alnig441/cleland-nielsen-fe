import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpErrorResponse } from "@angular/common/http";

import { MongoVideoModel } from "../models/mongoVideo.model";
import { AuthenticationService } from "./authentication.service";
import { SetMessageService } from "./set-message.service";

import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/retry';
import 'rxjs/add/observable/of';

@Injectable()

export class MongoVideoServices {
  private assets: any[] = new Array();
  private baseUrl = '/api';
  private modalSource: string;

  private viewSubject = new BehaviorSubject(this.assets);
  onUpdatedView = this.viewSubject.asObservable();

  private currentView : HttpParams;
  
  private setParams = (form : MongoVideoModel, page : number, doAnd : boolean) : HttpParams => {
    let params = new HttpParams({ fromString: 'doAnd' });
    let keys = Object.keys(form);
    keys.forEach( key => {
      if ( form[key] || ( typeof form[key] == 'number' && form[key] == 0 ) ){
        params = params.append(key, form[key]);
      }
    })
    params = page ? params.append('page', page.toString()) : params;
    params = doAnd ? params.set('doAnd', 'yes') : params;
    this.currentView = params;
    return this.currentView;
  }
  
  constructor(
    private message: SetMessageService,
    private http: HttpClient,
    private activeUser: AuthenticationService,
  ) {}
  
  initialiseModal(assets: any, index: number ): void {
    this.assets = assets;
    this.setModalSource(index);
  }
  
  clearModal(): void {
    this.assets = null;
    this.modalSource = null ;
  }

  setModalSource(index: number): void {
    this.modalSource = `videos/James/${this.assets[index].video.fileName}`;
  }

  getModalAssets(): any {
    return this.assets;
  }

  getModalSource(): any {
    return this.modalSource;
  }
  
  getTabs(year?: number): Observable<any> {

    if (this.activeUser.isAdmin || this.activeUser.isPermitted['to_view_videos']) {
      let params = new HttpParams();
      params = year ?
        params.append('year', year.toString()):
        params;

      try {
        let tabs = this.http.get(`${this.baseUrl}/generate_tabs/Videos`, { params : params , observe : 'body' })
        
        tabs.subscribe(
          (result : any) => {
            if(result.length == 0) {
              this.message.set({ status: 200 , statusText: 'database currently empty' })
            }
           },
          (error : HttpErrorResponse) => {
            this.message.set(error);
            throw error;
          })
        
        return tabs;
      }
      catch(error) {}
      finally {}

    } else {
      this.message.set({ status: 403, statusText: 'Get Tabs'});
    }

  }
  
  getView(form?: MongoVideoModel, page?: any, doAnd?: boolean): void {
    if(this.activeUser.isAdmin || this.activeUser.isPermitted['to_view_videos']) {

      let params = form ? this.setParams(form, page, doAnd) : this.currentView;

      try {
        this.http.get(`${this.baseUrl}/Search/Videos`, { params: params, observe: 'body' })
          .subscribe(
            ( videos : MongoVideoModel[]) => {
              this.assets = videos;
              this.viewSubject.next(videos);
            }, 
            ( error : HttpErrorResponse) => {
              this.message.set(error);
              throw error
            })
      }
      catch(error) {}
      finally {}

    } else {
      this.message.set({ status: 403, statusText: 'Get View'});
    }
  }

  search(form? : MongoVideoModel , page? : any , doAnd? : boolean) : Observable<any> {
    if (this.activeUser.isAdmin || this.activeUser.isPermitted['to_view_videos']) {
      let params = form ? this.setParams(form, page, doAnd) : this.currentView;

      try {
        let searchResult = this.http.get(`${this.baseUrl}/Search/Videos`, { params: params , observe: 'body' })
        
        searchResult.subscribe(
          (result : any) => {}, 
          (error : HttpErrorResponse) => {
            this.message.set(error)
          }
        )

        return searchResult;
      }
      catch(error) {}
      finally {}

    } else {
      this.message.set({ status: 403, statusText: 'Search'});
    }
  }
  
  update(_ids: string[], form: MongoVideoModel[]): void {
    if(this.activeUser.isAdmin || this.activeUser.isPermitted['to_edit_videos']) {
      let body = { form: form, _ids: _ids };

      try {
        this.http.post(`${this.baseUrl}/Update/Videos`, body, { observe: 'body' })
          .subscribe(
            ( result : any) => {
              this.message.set({ status: 200, statusText: 'Update Videos' })
              this.getView();
            }, 
            (error : HttpErrorResponse) => {
              this.message.set(error);
              throw error;
            })
      }
      catch(error) {}
      finally {}

    } else {
      this.message.set({ status: 403, statusText: 'Update Videos' })
    }
  }

  delete(_ids: string[]) : void {
    console.log('deleting videos')

    if(this.activeUser.isAdmin || this.activeUser.isPermitted['to_delete_videos']) {
      let params = new HttpParams();
      let body = 'body';
      let options = {
        params : params,
        body: body
      };

      try {
        this.http.delete(`${this.baseUrl}/Delete/Videos`, options)
          .subscribe(
            ( result: any) => {
              this.message.set({ status: 200, statusText: 'Delete Videos' })
              this.getView();
            }, 
            (error: HttpErrorResponse) => {
              this.message.set(error);
            }
          )
      }
      catch(error) {
      }
      finally {}

    } else {
      this.message.set({ status: 403, statusText: 'Delete Videos' })
    }
  }

}
