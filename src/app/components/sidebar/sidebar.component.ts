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

    activeService: string;
    error: any;

    constructor(private permissions: PermissionServices, private accounts: AccountServices, private activeUser: HttpAuthService, private activatedRoute: ActivatedRoute, private images: ImageServices, private router: Router, private users: UserServices){}

    ngOnInit(): void {
        console.log('sidebar comp init');
        this.activeService = this.activatedRoute.snapshot.url[0].path;
        this[this.activeService].error = null;
    }

   getAll() {
        this.activeUser.isPermitted['to_view_images'] = false;

       this[this.activeService].error = null;
       this[this.activeService].getAll()
           .catch((error: any) => {
                this[this.activeService].error = error;
                if(error.status === 401) {
                    setTimeout(() => {
                        this.activeUser.logout();
                        this.router.navigate(["/login"]);
                        this[this.activeService].error = null;
                    }, 3000)
                }
               setTimeout(()=> {
                    this[this.activeService].error = null;
               },3000)

               return Promise.resolve('ok');
           })
   }

   getOne() {
       console.log(`getting ONE of ${this.activeService}`);
       this[this.activeService].error = null;
       this[this.activeService].getLatest()
           .catch((error: any) => {
               this[this.activeService].error = error;
               if(error.status === 401) {
                   setTimeout(() => {
                       this.activeUser.logout();
                       this.router.navigate(["/login"]);
                       this[this.activeService].error = null;
                   }, 3000)
               }
               setTimeout(()=> {
                   this[this.activeService].error = null;
               },3000)

           })

   }

   getLatest() {
       console.log(`getting LATEST of ${this.activeService}`);
       this[this.activeService].error = null;
       this[this.activeService].getLatest()
           .catch((error: any) => {
               this[this.activeService].error = error;
               if(error.status === 401) {
                   setTimeout(() => {
                       this.activeUser.logout();
                       this.router.navigate(["/login"]);
                       this[this.activeService].error = null;
                   }, 3000)
               }
               setTimeout(()=> {
                   this[this.activeService].error = null;
               },3000)

           })
   }

   getList() {
        console.log(`getting LIST of ${this.activeService}`);
        this[this.activeService].error = null;
        this[this.activeService].getList()
            .catch((error: any) => {
                this[this.activeService].error = error;
                if(error.status === 401){
                    setTimeout(() => {
                        this.activeUser.logout();
                        this.router.navigate(["/login"]);
                        this[this.activeService].error = null;
                    },3000)
                }
                setTimeout(()=> {
                    this[this.activeService].error = null;
                },3000)

            })
   }

}