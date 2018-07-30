import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { UserServices } from "../../services/user.services";
import { UserModel } from "../../models/user.model";
import { AccountServices } from "../../services/account.services";
import { HttpAuthService } from "../../services/httpAuth.service";

@Component({
    selector: 'app-panel',
    template: require('./panel.component.pug'),
    styleUrls: ['./panel.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class PanelComponent implements OnInit {

    doEdit = {};

    languages = [
        {
            language: 'english'
        },
        {
            language: 'danish'
        }
    ]


    constructor(private activeUser: HttpAuthService, private userService: UserServices, private accountService: AccountServices) {}

    ngOnInit(): void {
        console.log('panel comp init');
        this.userService.getAll();
        this.accountService.getAll();
    }

    edit(user: UserModel): void {
        if(!this.activeUser.isPermitted['to_edit_users']){
        }

        else {
            console.log('editing user: ', user.user_name);
            this.doEdit[user.user_name] = true;
        }

    }

    done(user: UserModel): void {

        if(!this.activeUser.isPermitted['to_edit_users']){
        }

        else {
            console.log('done editing user: ', user);
            this.doEdit = {};
        }
    }

    addInput(input: any, i: any): void {

        if(!this.activeUser.isPermitted['to_edit_users']){
        }

        else {
            console.log('inputting this key/value: ', input);
            for(var prop in input){
                if(prop != 'account_id') {
                    if(prop == 'account_name'){
                        this.userService.users[i].account_type = input.account_id;
                    }
                    this.userService.users[i][prop] = input[prop];
                }
            }
        }
    }

    delete(user: UserModel): void {
        if(!this.activeUser.isPermitted['to_delete_users'] ){
        }

        else {
            console.log('deleting user: ', user.user_name);
        }
    }

}