import { Component, OnInit, ViewEncapsulation } from "@angular/core";

@Component({
    selector: 'app-about',
    template: require('./about.component.pug')

})

export class AboutComponent implements OnInit {
    constructor(){}

    ngOnInit(): void {
        console.log('about component initialised');
    }
}