import { Component, OnInit, ViewEncapsulation, DoCheck } from "@angular/core";
import { ImageServices } from "../../../services/image.services";
import { PermissionServices } from "../../../services/permission.services";
import { AccountServices } from "../../../services/account.services";
import { UserServices } from "../../../services/user.services";
import { HttpAuthService } from "../../../services/httpAuth.service";
import { HttpClient } from "@angular/common/http";
import {ImageModel} from "../../../models/image.model";

@Component({
    selector: 'app-images',
    template: require('./images.component.pug'),
    styleUrls: ['./images.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ImagesComponent implements OnInit, DoCheck {

    private imageForm: ImageModel;

    constructor(private http: HttpClient, private activeUser: HttpAuthService, private permissionService: PermissionServices, private accountService: AccountServices, private userService: UserServices, private imageService: ImageServices){}

    ngOnInit(): void {
        if(this.activeUser.isPermitted['to_view_images']){
            this.imageService.getAll()
                .catch((error: any ) => {
                    this.imageService.error = error;
                    setTimeout(() => {
                        this.imageService.error = null;
                    }, 3000)
                })
        }
    }

    ngDoCheck(): void {
        this.imageForm = this.imageService.images[0];
    }
}