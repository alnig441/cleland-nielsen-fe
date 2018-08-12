import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login.component";
import { AuthenticationService } from "../../services/authentication.service";

const LoginRoutes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(LoginRoutes)
    ],
    exports: [
        RouterModule
    ],
    providers: [
        AuthenticationService
    ]
})

export class LoginRoutingModule {}