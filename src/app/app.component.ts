import { Component, OnInit, ViewEncapsulation, HostListener } from "@angular/core";
import { AuthenticationService } from "./services/authentication.service";

@Component({
    selector: "app-root",
    template: require("./app.component.pug"),
    styleUrls: [ "./app.component.scss" ],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

    constructor(private user : AuthenticationService ) {}

    public ngOnInit(): void {

        console.log('app comp init');

    }

    @HostListener('window:mousemove', ['$event'])
    moveEvent(event: any) {

        if (this.user.isLoggedIn) {
            console.log('mouse moved detected: ', event);
        }
    }

    @HostListener('window:scroll', ['$event'])
    scrollEvent(event: any) {

        if (this.user.isLoggedIn) {
            console.log('scroll detected: ', event);
        }
    }

    @HostListener('window:keypress', ['$event'])
    pressEvent(event: any) {

        if (this.user.isLoggedIn) {
            console.log('key press detected: ', event);
        }
    }

    @HostListener('window:click', ['$event'])
    clickEvent(event: any) {

        if (this.user.isLoggedIn) {
            console.log('click detected: ', event);
        }
    }
}
