    import { Component, OnInit, ViewEncapsulation } from "@angular/core";

@Component({
    selector: 'app-public',
    template: require('./public.component.pug'),
    encapsulation: ViewEncapsulation.None
})

export class PublicComponent implements OnInit {

    constructor(){}

    ngOnInit():void {
        console.log('public compo init');
    }
}