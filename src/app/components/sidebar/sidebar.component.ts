import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpAuthService } from "../../services/httpAuth.service";
import { ImageServices } from "../../services/image.services";

@Component({
    selector: 'app-sidebar',
    template: require('./sidebar.component.pug'),
    encapsulation: ViewEncapsulation.None
})

export class SidebarComponent implements OnInit {

    activeService: string;

    constructor( private httpAuth: HttpAuthService, private activatedRoute: ActivatedRoute, private images: ImageServices, private router: Router){}

    ngOnInit(): void {
        this.activeService = this.activatedRoute.snapshot.url[0].path;
    }

   getAll() {
       console.log(`getting ALL of ${this.activeService}`);
       this[this.activeService].getAll()
           .catch((error: any) => {
               console.log(error);
           })
   }

   getOne() {
        console.log(`getting ONE of ${this.activeService}`);
   }

   getLatest() {
       console.log(`getting LATEST of ${this.activeService}`);
       this[this.activeService].getLatest()
           .catch((error: any) => {
               console.log(error);
           })
   }

   getList() {
        console.log(`getting LIST of ${this.activeService}`);
        this[this.activeService].getList()
            .catch((error: any) => {
                console.log(error);
                this[this.activeService].error = error;
                if(error.status === 401){
                    console.log('logging out');
                    setTimeout(() => {
                        this.httpAuth.logout();
                        this.router.navigate(["/login"]);
                        this[this.activeService].error = null;
                    },3000)
                }
            })
   }

}