import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login.component";
import { AuthService } from "../../services/auth.service";
import { HttpAuthService } from "../../services/httpAuth.service";

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
        AuthService,
        HttpAuthService
    ]
})

export class LoginRoutingModule {}