export class ImageModel {
    constructor(
        public id: number,
        public date: string, /* change do date object */
        public url: string,
        public meta: string[],
        public caption? : string
    ){}
}