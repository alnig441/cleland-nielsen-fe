export class MongoImageModel {
    constructor(
        public created?: string,
        public year?: string,
        public month?: string,
        public day?: string,
        public country?: string,
        public state?: string,
        public city?: string,
        public names?: string[],
        public keywords?: string[],
        public occasion?: string,
        public venue?: string,
        public en?: string,
        public da?: string,
        public fileName?:string
    ){}
}
