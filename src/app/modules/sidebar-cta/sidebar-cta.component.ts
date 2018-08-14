import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ImageServices } from "../../services/image.services";
import { UserServices } from "../../services/user.services";
import { AccountServices } from "../../services/account.services";
import { PermissionServices } from "../../services/permission.services";
import { ServiceModelManagerService } from "../../services/service-model-manager.service";

@Component({
    selector: 'app-sidebar-cta',
    template: require('./sidebar-cta.component.pug'),
    styleUrls: ['./sidebar-cta.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class SidebarCtaComponent implements OnInit {

    constructor(private formManager: ServiceModelManagerService, private permissions: PermissionServices, private accounts: AccountServices, private images: ImageServices, private users: UserServices){}

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