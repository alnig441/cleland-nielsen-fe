import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
    selector: 'app-private',
    template: require('./private.component.pug'),
    styleUrls: ['./private.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class PrivateComponent implements OnInit {

    constructor(private http: HttpClient) {}

    ngOnInit(): void {
        console.log('private component initiallised');
    }
}