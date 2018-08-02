import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { UserServices } from "../../services/user.services";
import { UserModel } from "../../models/user.model";
import { AccountServices } from "../../services/account.services";
import { HttpAuthService } from "../../services/httpAuth.service";
import {CompInitService} from "../../services/comp-init.service";

@Component({
    selector: 'app-user-panel',
    template: require('./user-panel.component.pug'),
    styleUrls: ['./user-panel.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class UserPanelComponent implements OnInit {

    doEdit = {};

    languages = [
        {
            language: 'english'
        },
        {
            language: 'danish'
        }
    ]


    constructor(private compInit: CompInitService, private activeUser: HttpAuthService, private userService: UserServices, private accountService: AccountServices) {}

    ngOnInit(): void {
        if(this.activeUser.isPermitted['to_view_users']){
            this.compInit.initialize('users')
                .then((result: any) => {
                    console.log('userPanel comp init ', result);
                })
        }
    }

    edit(user: UserModel): void {
        if(!this.activeUser.isPermitted['to_edit_users']){
            this.userService.error = { status: 405, message: 'insufficient permissions'}
            setTimeout(() => {
                this.userService.error = null;
            },3000)
        }

        else {
            console.log('editing user: ', user.user_name);
            this.doEdit[user.user_name] = true;
        }

    }

    editInput(input: any, i: any): void {

        if(!this.activeUser.isPermitted['to_edit_users']){
            this.userService.error = { status: 405, message: 'insufficient permissions'}
            setTimeout(() => {
                this.userService.error = null;
            },3000)
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

    done(user: UserModel): void {
        console.log('done editing user: ', user);
        this.doEdit = {};
        this.userService.editItem()
            .catch((error) =>{
                this.userService.error = error;
                setTimeout(()=>{
                    this.userService.error = null;
                }, 3000)
            })
    }

    delete(user_id: string): void {
        console.log('deleting user: ', user_id);
        this.userService.deleteItem(user_id)

    }
}