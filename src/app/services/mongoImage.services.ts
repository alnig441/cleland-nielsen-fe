import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpErrorResponse } from "@angular/common/http";

import { MongoImageModel } from "../models/mongoImage.model";
import { AuthenticationService } from "./authentication.service";
import { SetMessageService } from "./set-message.service";

// rxjs constants
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/retry';
import 'rxjs/add/observable/of';


@Injectable()

export class MongoImageServices {

  private assets: any[] = new Array();
  private baseUrl = '/api';
  private modalSource: string;

  // view observable/modal observable
  private viewSubject = new BehaviorSubject(this.assets);
  onUpdatedView = this.viewSubject.asObservable();

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

  private currentView: HttpParams;

  constructor(
    private http: HttpClient,
    private activeUser: AuthenticationService,
    private message: SetMessageService,
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
    this.modalSource = `photos/James/${this.assets[index].image.fileName}`;
  }

  getModalAssets(): any {
    return this.assets;
  }

  getModalSource(): any {
    return this.modalSource;
  }

  getSearchTerms(): Observable<any> {
    if (this.activeUser.isAdmin || this.activeUser.isPermitted['to_view_images']) {

      try {
        let result = this.http.get(`${this.baseUrl}/searchTerms/Photos`, { observe: 'body'})
        
        result.subscribe(
          (result: any) => {}, 
          (error: HttpErrorResponse) => {
            this.message.set(error);
            throw error;
          }
        );
        
        return result;
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
          (result:any) => {
            if(result.length == 0) {
              this.message.set({ status: 200 , statusText: 'database currently empty' })
            }
           },
          (error:HttpErrorResponse) => {
            this.message.set(error);
            // this.message.set({ status : error.status , message : error.statusText })
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

      try {
        this.http.get(`${this.baseUrl}/Search/Photos`, { params: params, observe: 'body' })
          .subscribe(( result: MongoImageModel[]) => {
            this.assets = result;
            this.viewSubject.next(result);
          }, ( error: HttpErrorResponse) => {
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
        let result = this.http.get(`${this.baseUrl}/Search/Photos`, { params: params , observe: 'body' })
        
        result.subscribe(
          (result: any) => {}, 
          (error: HttpErrorResponse) => {
            this.message.set(error)
          }
        )

        return result;
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
          .subscribe(( result: any) => {
            this.message.set({ status: 200, statusText: 'Update Images' })
            this.getView();
          }, (error: HttpErrorResponse) => {
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
    if(this.activeUser.isAdmin || this.activeUser.isPermitted['to_edit_images']) {
      let params = new HttpParams();
      let body = 'body';
      let options = {
        params : params,
        body: body
      };

      try {
        this.http.delete(`${this.baseUrl}/Update/Photos`, options)
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
