import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
var SiteCopy = require("../../../../api/site_copy.json");

@Component({
    selector: "plum-home",
    template: require("./home.component.pug"),
    styleUrls: [ "./home.component.scss" ]
})
export class HomeComponent implements OnInit {

    constructor(private http: HttpClient) {}

    private home: string[];

    private myApi: string[];

    public ngOnInit(): void {

        this.home = SiteCopy.Home;

        this.http.get<ItemsResponse>("../api/site_copy.json")
        //RETRY ON FAILURE
            .retry(3)
            .subscribe(data => {
                this.myApi = data.Home;
                console.log('home component: ', this.myApi);
            }, err => {
                //    IMPLEMENT ERROR HANDLING
                console.log('error: ', err);
            })
    }
}

interface ItemsResponse {
    Home: string[];
}