import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { AuthenticationService } from "../../services/authentication.service";

@Component({
    selector: 'app-globalnav',
    template: require('./globalnav.component.pug'),
    styleUrls: ['./globalnav.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class GlobalnavComponent implements OnInit {

    navbarLinks = [
            { name: 'home'},
            { name: 'about'},
            { name: 'work'},
            { name: 'contact'},
            { name: 'images' ,      permission: 'to_view_images'},
            { name: 'videos' ,      permission: 'to_view_videos'},
            { name: 'users' ,       permission: 'to_view_users'},
            { name: 'accounts' ,    permission: 'to_view_accounts'},
            { name: 'permissions',  permission: 'to_view_permissions'}
    ]

    constructor(
        private http: HttpClient,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private activeUser: AuthenticationService
    ) {}

    ngOnInit(): void {
    }

    logout() : void {
        this.activeUser.logout();
        this.router.navigate([this.activeUser.redirectUrl]);
    }
}