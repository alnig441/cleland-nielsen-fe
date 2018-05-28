import { Component, OnInit, ViewEncapsulation } from "@angular/core";

@Component({
    selector: 'app-work',
    template: require('./work.component.pug')
})

export class WorkComponent implements OnInit {

    constructor() {}

    ngOnInit(): void {
        console.log('work component initialised');
    }
}