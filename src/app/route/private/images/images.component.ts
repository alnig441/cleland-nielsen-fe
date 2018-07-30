import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ImageServices } from "../../../services/image.services";
import { PermissionServices } from "../../../services/permission.services";
import { AccountServices } from "../../../services/account.services";
import { UserServices } from "../../../services/user.services";
import { HttpAuthService } from "../../../services/httpAuth.service";

@Component({
    selector: 'app-images',
    template: require('./images.component.pug'),
    styleUrls: ['./images.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ImagesComponent implements OnInit {

    constructor(private activeUser: HttpAuthService, private permissionService: PermissionServices, private accountService: AccountServices, private userService: UserServices, private imageService: ImageServices){}

    ngOnInit(): void {
        this.imageService.getLatest();
        console.log('image comp init: ', this.activeUser.isPermitted)
    }

}