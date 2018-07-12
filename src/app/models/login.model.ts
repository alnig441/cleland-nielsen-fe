export class LoginModel {
    constructor(
        public username: string,
        public password: string,
        public accounttype? : string
    ){}
}