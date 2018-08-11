import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { AccountServices } from "../../../../services/account.services";
import { HttpAuthService } from "../../../../services/httpAuth.service";
import { UserModel } from "../../../../models/user.model";
import { CompInitService } from "../../../../services/comp-init.service";
import { UserServices } from "../../../../services/user.services";
import { ActivatedRoute } from "@angular/router";
import { ServiceFormManagerService } from "../../../../services/service-form-manager.service";

@Component({
    selector: 'app-users',
    template: require('./users.component.pug'),
    encapsulation: ViewEncapsulation.None
})

export class UsersComponent implements OnInit {

    userUpdated: boolean = false;
    doEdit = {};

    constructor(private formManager: ServiceFormManagerService, private activatedRoute: ActivatedRoute, private compInit: CompInitService, private activeUser: HttpAuthService, private accountService: AccountServices, private userService: UserServices) {}

    ngOnInit(): void {
        console.log('user comp initialization ... ');

        this.formManager.setService(this.activatedRoute.snapshot.url[0].path);

        if(this.activeUser.isPermitted['to_view_users']){
            this.compInit.initialize('accounts')
                .then((result: any) => {
                    console.log('... accounts loaded: ' + result + ': ', this.activatedRoute.snapshot.url[0].path);

                })
            this.compInit.initialize('users')
                .then((result: any) => {
                    console.log('... users loaded: ', result);
                })
        }
    }

    edit(user: UserModel): void {

        this.doEdit[user.user_name] = true;

    }

    done(user: UserModel): void {

        if(this.userUpdated){
            this.userService.editItem(user)
        }

        this.doEdit = {};
        this.userUpdated = false;
    }

    delete(user_id: string): void {
        console.log(`deleting user ${user_id}`)
        this.userService.deleteItem(user_id)
    }
}