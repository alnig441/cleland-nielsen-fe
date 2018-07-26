import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { AccountServices } from "../../../services/account.services";

@Component({
    selector: 'app-accounts',
    template: require('./accounts.component.pug'),
    encapsulation: ViewEncapsulation.None
})

export class AccountsComponent implements OnInit {

    constructor(private accountService: AccountServices){}

    ngOnInit(): void {
        console.log('accounts comp init');
        // this.accountService.getAll();
        this.accountService.error = null;
    }
}