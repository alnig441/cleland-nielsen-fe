export class AccountModel {
    constructor(
        public account_id: string,
        public account_name?: string,
        public account_permissions?: string[]
    ){}
}