import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { UserServices } from "../../services/user.services";
import { UserModel } from "../../models/user.model";

@Component({
    selector: 'app-panel',
    template: require('./panel.component.pug'),
    styleUrls: ['./panel.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class PanelComponent implements OnInit {

    doEdit = {};
    userModel = new UserModel('','');
    accountTypes = [
        {
            account_id: 1,
            account_type: 'standard_user'
        },
        {
            account_id: 2,
            account_type: 'super_user'

        },
        {
            account_id: 3,
            account_type: 'administrator'
        }
    ]

    languages = [
        {
            language: 'english'
        },
        {
            language: 'danish'
        }
    ]


    constructor(private users: UserServices) {}

    ngOnInit(): void {
        console.log('panel comp init', this.userModel);
    }

    edit(user: UserModel): void {
        console.log('editing user: ', user.user_name);
        this.doEdit[user.user_name] = true;
        this.userModel = user;

    }

    done(user: UserModel): void {
        console.log('done editing user: ', this.userModel, user);
        this.doEdit = {};
        this.userModel =  new UserModel('','');
    }

    addInput(type: any): void {
        console.log('inputting this account: ', type);
        for(var prop in type){
            if(prop != 'account_id') {
                if(prop == 'account_type'){
                    this.userModel[prop] = type.account_id;
                }
                this.userModel[prop] = type[prop];
            }
        }
    }

    delete(user: UserModel): void {
        console.log('deleting user: ', user.user_name);
    }
}