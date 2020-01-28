import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { UserServices } from "../../services/user.services";
import { AccountServices } from "../../services/account.services";
import { PermissionServices } from "../../services/permission.services";
import { ServiceModelManagerServices } from "../../services/service-model-manager.services";

@Component({
    selector: 'app-sidebar-cta',
    template: require('./sidebar-cta.component.pug'),
    styleUrls: ['./sidebar-cta.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class SidebarCtaComponent implements OnInit {

    constructor(
        private formManager: ServiceModelManagerServices,
        private permissions: PermissionServices,
        private accounts: AccountServices,
        private users: UserServices
    ){}

    ngOnInit(): void {
    }

   getAll() {
       this[this.formManager.getService()].getAll()
   }

   getOne() {
       this[this.formManager.getService()].getLatest()
   }

   getLatest() {
       this[this.formManager.getService()].getLatest()
   }

   getList() {
        this[this.formManager.getService()].getList()
   }

   addItem() {
       this[this.formManager.getService()].addItem()
   }
}
