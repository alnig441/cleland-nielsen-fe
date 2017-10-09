import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { HttpClient } from "@angular/common/http";
const SiteCopy = require("../../../../api/site_copy.json");

@Component({
    selector: "template-test",
    template: require("./ngfor.component.pug")
})
export class NgForComponent implements OnInit {

    private test: string[] = SiteCopy.Home;

    private runMe(parm: string) {
        console.log('runMe ok? ', parm)
    }

    constructor(private http: HttpClient) {}

    public ngOnInit(): void {

    }



}
