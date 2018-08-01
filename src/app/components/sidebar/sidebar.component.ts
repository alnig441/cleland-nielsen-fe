import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpAuthService } from "../../services/httpAuth.service";
import { ImageServices } from "../../services/image.services";
import { UserServices } from "../../services/user.services";
import { AccountServices } from "../../services/account.services";
import { PermissionServices } from "../../services/permission.services";

@Component({
    selector: 'app-sidebar',
    template: require('./sidebar.component.pug'),
    encapsulation: ViewEncapsulation.None
})

export class SidebarComponent implements OnInit {

    requestedService: string;
    error: any;

    constructor(private permissions: PermissionServices, private accounts: AccountServices, private activeUser: HttpAuthService, private activatedRoute: ActivatedRoute, private images: ImageServices, private router: Router, private users: UserServices){}

    ngOnInit(): void {
        console.log(`sidebar comp init`);
        this.requestedService = this.activatedRoute.snapshot.url[0].path;
        this[this.requestedService].error = null;
    }

   getAll() {
       console.log(`getting ALL ${this.requestedService}`);
       this[this.requestedService].error = null;
       this[this.requestedService].getAll()
           .catch((error: any) => {
                this[this.requestedService].error = error;
                if(error.status === 401) {
                    setTimeout(() => {
                        this.activeUser.logout();
                        this.router.navigate(["/login"]);
                        this[this.requestedService].error = null;
                    }, 3000)
                }
               setTimeout(()=> {
                    this[this.requestedService].error = null;
               },3000)

               return Promise.resolve('ok');
           })
   }

   getOne() {
       console.log(`getting ONE of ${this.requestedService}`);
       this[this.requestedService].error = null;
       this[this.requestedService].getLatest()
           .catch((error: any) => {
               this[this.requestedService].error = error;
               if(error.status === 401) {
                   setTimeout(() => {
                       this.activeUser.logout();
                       this.router.navigate(["/login"]);
                       this[this.requestedService].error = null;
                   }, 3000)
               }
               setTimeout(()=> {
                   this[this.requestedService].error = null;
               },3000)

           })

   }

   getLatest() {
       console.log(`getting LATEST of ${this.requestedService}`);
       this[this.requestedService].error = null;
       this[this.requestedService].getLatest()
           .catch((error: any) => {
               this[this.requestedService].error = error;
               if(error.status === 401) {
                   setTimeout(() => {
                       this.activeUser.logout();
                       this.router.navigate(["/login"]);
                       this[this.requestedService].error = null;
                   }, 3000)
               }
               setTimeout(()=> {
                   this[this.requestedService].error = null;
               },3000)

           })
   }

   getList() {
        console.log(`getting LIST of ${this.requestedService}`);
        this[this.requestedService].error = null;
        this[this.requestedService].getList()
            .catch((error: any) => {
                this[this.requestedService].error = error;
                if(error.status === 401){
                    setTimeout(() => {
                        this.activeUser.logout();
                        this.router.navigate(["/login"]);
                        this[this.requestedService].error = null;
                    },3000)
                }
                setTimeout(()=> {
                    this[this.requestedService].error = null;
                },3000)

            })
   }

   addItem() {
       console.log(`adding ${this.requestedService}`);
       this[this.requestedService].error = null;
       this[this.requestedService].addItem()
           .catch((error: any) => {
               this[this.requestedService].error = error;
               if(error.status === 401){
                   setTimeout(() => {
                       this.activeUser.logout();
                       this.router.navigate(["/login"]);
                       this[this.requestedService].error = null;
                   },3000)
               }
               setTimeout(()=> {
                   this[this.requestedService].error = null;
               },3000)

           })
   }
}