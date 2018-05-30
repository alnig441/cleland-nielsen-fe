import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import {AuthService} from "../../../services/auth.service";

@Component({
    selector: 'app-about',
    template: require('./about.component.pug'),
    encapsulation: ViewEncapsulation.None

})

export class AboutComponent implements OnInit {

    constructor(private authService: AuthService){}

    ngOnInit(): void {
        console.log('about component initialised', this.authService.isLoggedIn);

    }
}