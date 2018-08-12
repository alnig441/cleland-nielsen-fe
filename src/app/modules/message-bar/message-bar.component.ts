import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { SetMessageService } from "../../services/setMessage.service";

@Component({
    selector: "app-messagebar",
    template: require('./message-bar.component.pug'),
    encapsulation: ViewEncapsulation.None
})

export class MessagebarComponent implements OnInit {


    constructor(private setMessage: SetMessageService){}

    ngOnInit(): void {
    }

}