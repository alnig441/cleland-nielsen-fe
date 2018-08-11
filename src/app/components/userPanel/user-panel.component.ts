import { Component, OnInit, ViewEncapsulation } from "@angular/core";
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

    userUpdated: boolean = false;
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

        this.doEdit[user.user_name] = true;

    }

    done(user: UserModel): void {

        if(this.userUpdated){
            this.userService.editRecord(user)
        }

        this.doEdit = {};
        this.userUpdated = false;
    }

    delete(user_id: string): void {

        this.userService.deleteRecord(user_id)

    }

}