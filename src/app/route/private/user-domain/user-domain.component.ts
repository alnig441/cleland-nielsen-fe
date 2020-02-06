import { Component, DoCheck, OnInit, ViewEncapsulation, HostListener } from "@angular/core";
import { AuthenticationServices } from "../../../services/authentication.services";
import { MongoImageServices } from "../../../services/mongoImage.services";
import { MongoVideoServices } from "../../../services/mongoVideo.services";
import { AppAlertsServices } from "../../../services/app-alerts.services";
import { ServiceModelManagerServices } from "../../../services/service-model-manager.services";


const io = require('../../../../js/socket.io.js');

const $ = require('jquery');

@Component({
    selector: 'app-user-domain',
    template: require('./user-domain.component.pug'),
    styleUrls: ['./user-domain.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class UserDomainComponent {

    private recordModel: any;
    private service: any;

    constructor(
        private activeUser: AuthenticationServices,
        private formManager: ServiceModelManagerServices,
        private alerts: AppAlertsServices,
        private images: MongoImageServices,
        private videos: MongoVideoServices
    ){
      this.formManager.serviceReady.subscribe((service: string) => {
        if(service) {
          this.recordModel = this.formManager.getRecordModel();
          this.service = this[service];
          
        }
      })
      
      if(this.activeUser.isLoggedIn && !this.activeUser.isAdmin){
        var socket = io();
        socket.on('update', (arg: any)=> {
          this.service.getView();
          this.service.getSearchTerms();
          this.alerts.set({ status: null, statusText: 'app updated' })
        })
      }
    }

}
