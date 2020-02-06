import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpErrorResponse } from "@angular/common/http";

import { MongoImageModel } from "../models/mongoImage.model";
import { AuthenticationServices } from "./authentication.services";
import { AppAlertsServices } from "./app-alerts.services";

// rxjs constants
import { BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/retry';
import 'rxjs/add/observable/of';


@Injectable()

export class MongoImageServices {

  private assets: any[] = new Array();
  private baseUrl = '/api';

  private viewSubject = new BehaviorSubject({images: this.assets, isSearch: false});
  onUpdatedView = this.viewSubject.asObservable();
  private currentView: HttpParams;
  
  private searchTermsSubject = new BehaviorSubject(null);
  onUpdatedSearchTerms = this.searchTermsSubject.asObservable();

  private setParams = (form : MongoImageModel, page : number, doAnd : boolean) : HttpParams => {
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
    private http: HttpClient,
    private activeUser: AuthenticationServices,
    private message: AppAlertsServices,
  ) {
    this.getSearchTerms();
  }

  getSearchTerms(): Observable<any> {
    if (this.activeUser.isAdmin || this.activeUser.isPermitted['to_view_images']) {

      try {
        let searchTerms = this.http.get(`${this.baseUrl}/searchTerms/Photos`, { observe: 'body'})
        
        searchTerms.subscribe(
          (result: any) => {
            this.searchTermsSubject.next(result);
          }, 
          (error: HttpErrorResponse) => {
            this.message.set(error);
            throw error;
          }
        );
        
        return searchTerms;
      }
      catch(e) {}
      finally {}

    } else {
      this.message.set({ status: 403, statusText: 'Get Search Terms' })
    }
  }

  getTabs(year?: number): Observable<any> {

    if (this.activeUser.isAdmin || this.activeUser.isPermitted['to_view_images']) {
      let params = new HttpParams();
      params = year ?
        params.append('year', year.toString()):
        params;

      try {
        let tabs = this.http.get(`${this.baseUrl}/generate_tabs/Photos`, { params : params , observe : 'body' })
        
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

  getView(form?: MongoImageModel, page?: any, doAnd?: boolean): void {
    if(this.activeUser.isAdmin || this.activeUser.isPermitted['to_view_images']) {

      let params = form ? this.setParams(form, page, doAnd) : this.currentView;
      let isSearch = isNaN(parseInt(this.currentView.get('page')));

      try {
        this.http.get(`${this.baseUrl}/Search/Photos`, { params: params, observe: 'body' })
          .subscribe(
            ( images : MongoImageModel[]) => {
              this.assets = images;
              this.viewSubject.next({ images: images, isSearch: isSearch });
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

  search(form? : MongoImageModel , page? : any , doAnd? : boolean) : Observable<any> {
    if (this.activeUser.isAdmin || this.activeUser.isPermitted['to_view_images']) {
      let params = form ? this.setParams(form, page, doAnd) : this.currentView;

      try {
        let searchResult = this.http.get(`${this.baseUrl}/Search/Photos`, { params: params , observe: 'body' })
        
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


  update(_ids: string[], form: MongoImageModel[]): void {
    if(this.activeUser.isAdmin || this.activeUser.isPermitted['to_edit_images']) {
      let body = { form: form, _ids: _ids };

      try {
        this.http.post(`${this.baseUrl}/Update/Photos`, body, { observe: 'body' })
          .subscribe(
            ( result : any) => {
              this.message.set({ status: 200, statusText: 'Update Images' })
              this.getView();
              this.getSearchTerms();
            }, 
            (error : HttpErrorResponse) => {
              this.message.set(error);
              throw error;
            })
      }
      catch(error) {}
      finally {}

    } else {
      this.message.set({ status: 403, statusText: 'Update Images' })
    }
  }

  delete(_ids: string[]) : void {
    console.log('deleting images')
    
    if(this.activeUser.isAdmin || this.activeUser.isPermitted['to_delete_images']) {
      let params = new HttpParams();
      let body = 'body';
      let options = {
        params : params,
        body: body
      };

      try {
        this.http.delete(`${this.baseUrl}/Delete/Photos`, options)
          .subscribe(
            ( result: any) => {
              this.message.set({ status: 200, statusText: 'Delete Images' })
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
      this.message.set({ status: 403, statusText: 'Delete Images' })
    }
  }

}
