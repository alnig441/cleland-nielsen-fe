import { Component, DoCheck, OnInit, ViewEncapsulation } from "@angular/core";
import { SetMessageService } from "../../services/set-message.service";
import { state, style, animate, transition, trigger } from "@angular/animations";

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

    constructor(private setMessage: SetMessageService){}

    ngOnInit(): void {
        this.state = this.setMessage.getResponseState();
    }

    ngDoCheck(): void {
        this.state = this.setMessage.getResponseState();
    }

}