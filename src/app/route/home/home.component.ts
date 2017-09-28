import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
    selector: "plum-home",
    template: require("./home.component.pug"),
    styleUrls: [ "./home.component.scss" ]
})
export class HomeComponent implements OnInit {

    constructor(private http: HttpClient) {}

    private home: string[];

    public ngOnInit(): void {

        this.http.get<ItemsResponse>("../api/site_copy.json")
        //RETRY ON FAILURE
            .retry(3)
            .subscribe(data => {
                this.home = data.appComponents["home"];
                console.log('home component: ', this.home);
            }, err => {
                //    IMPLEMENT ERROR HANDLING
                console.log('error: ', err);
            })
    }
}

interface ItemsResponse {
    appComponents: string[];
}