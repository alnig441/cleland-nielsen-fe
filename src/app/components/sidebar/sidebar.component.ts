import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpAuthService } from "../../services/httpAuth.service";
import { ImageServices } from "../../services/image.services";
import { UserServices } from "../../services/user.services";
import { AccountServices } from "../../services/account.services";
import { PermissionServices } from "../../services/permission.services";
import { ServiceFormManagerService } from "../../services/service-form-manager.service";

@Component({
    selector: 'app-sidebar',
    template: require('./sidebar.component.pug'),
    encapsulation: ViewEncapsulation.None
})

export class SidebarComponent implements OnInit {

    constructor(private formManager: ServiceFormManagerService, private permissions: PermissionServices, private accounts: AccountServices, private activeUser: HttpAuthService, private activatedRoute: ActivatedRoute, private images: ImageServices, private router: Router, private users: UserServices){}

    ngOnInit(): void {
        console.log(`sidebar comp init`);
    }

   getAll() {
       console.log(`getting ALL ${this.formManager.getService()}`);
       this[this.formManager.getService()].getAll()
   }

   getOne() {
       console.log(`getting ONE ${this.formManager.getService()}`);
       this[this.formManager.getService()].getLatest()
   }

   getLatest() {
       console.log(`getting LATEST ${this.formManager.getService()}`);
       this[this.formManager.getService()].getLatest()
   }

   getList() {
       console.log(`getting LIST of ${this.formManager.getService()}`);
        this[this.formManager.getService()].getList()
   }

   addItem() {
       console.log(`adding ${this.formManager.getService()}`);
       this[this.formManager.getService()].addItem()
   }
}