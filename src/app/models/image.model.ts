export class ImageModel {
    constructor(
        public id?: string,
        public created?: string,
        public meta?: string[],
        public year?: string,
        public month?: string,
        public day?: string,
        public file?: string,
        public storage?: string,
        public occasion?: string,
        public country?: string,
        public state?: string,
        public city?: string,
        public names?: string[],
        public event_da?: string,
        public event_en?: string,
    ){}
}