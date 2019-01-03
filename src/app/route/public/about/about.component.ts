import { Component, OnInit, ViewEncapsulation } from "@angular/core";

@Component({
    selector: 'app-about',
    template: require('./about.component.pug'),
    encapsulation: ViewEncapsulation.None

})

export class AboutComponent implements OnInit {

    constructor(

    ){}

    ngOnInit(): void {
    }
}