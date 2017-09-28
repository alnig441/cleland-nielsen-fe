import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import "rxjs/add/operator/retry";

@Component({
    selector: "plum-app",
    template: require("./app.component.pug"),
    styleUrls: [ "./app.component.scss" ],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

    private app: string[];

    constructor(private http: HttpClient) {}

    public ngOnInit(): void {

        this.http.get<ItemsResponse>("../api/site_copy.json")
            //RETRY ON FAILURE
            .retry(3)
            .subscribe(data => {
            this.app = data.appComponents;
            }, err => {
            //    IMPLEMENT ERROR HANDLING
            console.log('error: ', err);
        })

    }

}

interface ItemsResponse {
    appComponents: string[];
}