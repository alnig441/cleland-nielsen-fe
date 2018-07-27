export class ListValidator {

    validateList(table: any, permission: any, index: any): boolean {
        return table.find((uuid : any) => {
            return uuid == permission;
        }) ? false : true;
    }
}