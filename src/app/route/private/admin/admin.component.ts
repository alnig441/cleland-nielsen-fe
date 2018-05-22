import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
    selector: 'app-admin',
    template: require('./admin.component.pug'),
    styleUrls: ['./admin.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class AdminComponent implements OnInit {

    constructor(private http: HttpClient) {}

    ngOnInit(): void {
        console.log('admin component initialised');
    }
}