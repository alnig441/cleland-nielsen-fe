export class LoginModel {
    constructor(
        public userId: string,
        public password: string,
        public accountType? : string
    ){}
}