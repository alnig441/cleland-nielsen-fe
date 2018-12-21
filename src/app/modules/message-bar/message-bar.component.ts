import { Component, DoCheck, OnInit, OnDestroy, ViewEncapsulation, Output, EventEmitter, ElementRef } from "@angular/core";
import { SetMessageService } from "../../services/set-message.service";
import { state, style, animate, transition, trigger, AnimationEvent } from "@angular/animations";
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
        private element: ElementRef
    ){}

    ngOnInit(): void {
        this.state = this.messageService.getResponseState();
        this.message = this.messageService.getResponse();
    }

    ngDoCheck(): void {
        this.state = this.messageService.getResponseState();
        this.message = this.messageService.getResponse();

    }

    onBegin(event?:any): void {
        console.log('on begin', event);
    }

    onEnd(event?:any): void {
        console.log('on end', event);
    }

    cancelLogout(): void {
        console.log('cancelling logout');
        this.messageService.cancelForceLogout();
    }

}