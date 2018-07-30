import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { NavigationStart, Router, NavigationEnd, ActivatedRoute} from "@angular/router";
import { HttpAuthService } from "../../services/httpAuth.service";
import { UserServices } from "../../services/user.services";
import { AccountServices } from "../../services/account.services";
import { PermissionServices } from "../../services/permission.services";
import { ImageServices } from "../../services/image.services";

@Component({
    selector: 'app-private',
    template: require('./private.component.pug'),
    styleUrls: ['./private.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class PrivateComponent implements OnInit {

    constructor(private activeUser: HttpAuthService, private http: HttpClient, private router: Router,
                private activatedRoute: ActivatedRoute, private userService: UserServices, private accountService: AccountServices, private permissionService: PermissionServices, private imageService: ImageServices) { }

    ngOnInit(): void {
        console.log('private component initiallised', this.activeUser.isPermitted);
    }

}