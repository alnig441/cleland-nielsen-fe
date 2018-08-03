import { Component, OnChanges, OnInit, SimpleChanges, ViewEncapsulation, Input} from "@angular/core";
import { UserServices } from "../../services/user.services";
import { UserModel } from "../../models/user.model";
import { AccountServices } from "../../services/account.services";
import { HttpAuthService } from "../../services/httpAuth.service";
import { CompInitService} from "../../services/comp-init.service";

@Component({
    selector: 'app-user-panel',
    template: require('./user-panel.component.pug'),
    styleUrls: ['./user-panel.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class UserPanelComponent implements OnInit {

    // userUpdated: boolean = false;
    doEdit = {};

    // @Input() - ngOnChanges ... implement??

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

    // ngOnChanges(changes: SimpleChanges): void {
    //     // this.userUpdated = true;
    //     console.log('changes: ', changes);
    // }

    edit(user: UserModel): void {

        if(!this.activeUser.isPermitted['to_edit_users']){
            this.userService.error = { status: 405, message: 'insufficient permissions'}
            setTimeout(() => {
                this.userService.error = null;
            },3000)
        }

        else {
            this.doEdit[user.user_name] = true;
        }

    }

    // editInput(input: any, i: any): void {
    //
    //     if(!this.activeUser.isPermitted['to_edit_users']){
    //         this.userService.error = { status: 405, message: 'insufficient permissions'}
    //         setTimeout(() => {
    //             this.userService.error = null;
    //         },3000)
    //     }
    //
    //     else {
    //         for(var prop in input){
    //             if(prop != 'account_id') {
    //                 if(prop == 'account_name'){
    //                     this.userService.users[i].account_type = input.account_id;
    //                 }
    //                 this.userService.users[i][prop] = input[prop];
    //             }
    //         }
    //         this.userUpdated = true;
    //     }
    // }

    done(user: UserModel): void {

        this.doEdit = {};

        // if(this.userUpdated){
            this.userService.editItem(user)
        // }

        // this.userUpdated = false;
    }

    delete(user_id: string): void {

        this.userService.deleteItem(user_id)

    }
}