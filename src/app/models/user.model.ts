export class UserModel {
    constructor(
        public user_name: string,
        public password: string,
        public user_id?: string,
        public account_type?: string,
        public language?: string
    ){}
}