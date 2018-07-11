export class LoginModel {
    constructor(
        public userId: string,
        public password: string,
        public accountType? : string
    ){}
}

// export interface LoginModel{
//     userId: string,
//     password: string
// }