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
        this.resetActivityTimer()
    }

    @HostListener('window:scroll', ['$event'])
    scrollEvent(event: any) {
        this.resetActivityTimer()
    }

    @HostListener('window:keypress', ['$event'])
    pressEvent(event: any) {
        this.resetActivityTimer()
    }

    @HostListener('window:click', ['$event'])
    clickEvent(event: any) {
        this.resetActivityTimer()
    }

    resetActivityTimer(): void {
        if (this.user.isLoggedIn) {
            this.user.activityTimer = 0;
        }
    }
}
