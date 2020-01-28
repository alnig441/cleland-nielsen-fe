import { Component, DoCheck, OnInit, ViewEncapsulation } from "@angular/core";
import { AppAlertsServices } from "../../services/app-alerts.services";
import { state, style, animate, transition, trigger } from "@angular/animations";
import { AuthenticationServices } from "../../services/authentication.services";

@Component({
    selector: "app-alerts",
    template: require('./app-alerts.component.pug'),
    styleUrls: ['./app-alerts.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [
        trigger('message', [
            state('hidden', style({
                opacity: '0',
                zIndex: '-10'
            })),
            state('visible', style( {
                opacity: '1',
                zIndex: '1000'
            })),
            transition('hidden <=> visible', [animate(300, style({})), animate(500)])
        ])
    ]
})

export class AppAlertsComponent {

    state: string = 'hidden';
    message: any;

    constructor(
        private alert: AppAlertsServices,
        private activeUser: AuthenticationServices,
    ){
      this.alert.clear();

      this.alert.onUpdatedMessage.subscribe((message: any) => {

        this.message = message;

        if (message.type) {
          let delay = message.forceLogout ? 10000 : 3500;
          this.state = 'visible';

          setTimeout(() => {
            this.state = 'hidden';
          }, delay)
        }

      })
    }


    onBegin(event?:any): void {
        if (event.fromState == 'hidden' && event.phaseName == 'start'){
        }
    }

    onEnd(event?:any): void {
      if (event.fromState == 'visible' && event.phaseName == 'done')
        if (this.message.forceLogout || this.message.status == 401) {
          this.alert.setForceLogout();
        }
    }

    cancel(): void {
      if (this.message.forceLogout) {
        this.message.forceLogout = false;
      }
      this.state = 'hidden';
    }

}
