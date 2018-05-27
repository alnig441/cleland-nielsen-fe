import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { NavigationStart, Router, NavigationEnd, ActivatedRoute} from "@angular/router";
import { filter } from "rxjs/operator/filter";
import { SubscribeOnObservable } from "rxjs/observable/SubscribeOnObservable";

@Component({
    selector: 'app-private',
    template: require('./private.component.pug'),
    styleUrls: ['./private.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class PrivateComponent implements OnInit {

    constructor(private http: HttpClient, private router: Router,
                private activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
        console.log('private component initiallised');

        // this.activatedRoute.data.subscribe((data:any) => {
        //     console.log("route data: ", data);
        // })


        // this.router.events.filter((event)=> event instanceof NavigationEnd)
        //     .map(() => this.activatedRoute)
        //     .subscribe((event) => {
        //         console.log('navigation started: ', event);
        //     })
    }

}