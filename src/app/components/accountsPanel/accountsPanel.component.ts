import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { AccountServices } from "../../services/account.services";

@Component({
    selector: 'app-accounts-panel',
    template: require('./accountsPanel.component.pug'),
    encapsulation: ViewEncapsulation.None
})

export class AccountsPanelComponent implements OnInit {

    constructor(private accountService: AccountServices) {}

    ngOnInit(): void {
        this.accountService.getAll();
        console.log('acctPanel comp init');
    }
}