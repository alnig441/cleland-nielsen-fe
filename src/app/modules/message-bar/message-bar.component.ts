import { Component, DoCheck, OnInit, ViewEncapsulation } from "@angular/core";
import { SetMessageService } from "../../services/set-message.service";
import { state, style, animate, transition, trigger } from "@angular/animations";
import { AuthenticationService } from "../../services/authentication.service";

@Component({
    selector: "app-messagebar",
    template: require('./message-bar.component.pug'),
    styleUrls: ['./message-bar.component.scss'],
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

export class MessagebarComponent implements OnInit, DoCheck {

    state: string;
    message: {};
    timeout: any;

    constructor(
        private messageService: SetMessageService,
        private activeUser: AuthenticationService,
    ){}

    ngOnInit(): void {
        this.messageService.clear();
        this.state = this.messageService.getState();
        this.message = this.messageService.get();
    }

    ngDoCheck(): void {
        this.state = this.messageService.getState();
        this.message = this.messageService.get();

    }

    onBegin(event?:any): void {
        if (event.fromState == 'hidden' && event.phaseName == 'start'){
            console.log('animation on start')
        }
    }

    onEnd(event?:any): void {
        if (event.fromState == 'visible' && event.phaseName == 'done'){
            if (this.messageService.getForceLogout()) {
                this.activeUser.logout();
            }
        }
    }

    cancelLogout(): void {
        console.log('cancelling logout');
        this.messageService.cancel();
    }

}