export class MongoImageModel {
    constructor(
        private created?: string,
        private year?: number,
        private month?: number,
        private day?: number,
        private country?: string,
        private state?: string,
        private city?: string,
        private names?: string[],
        private keywords?: string[],
        private occasion?: string,
        private venue?: string,
        private en?: string,
        private da?: string,
        private fileName?:string
    ){}
    
    setYear(year: number) {
      this.year = year;
    }    
    
    setMonth(month: number) {
      this.month = month;
    }
    
    setDay(day: number) {
      this.day = day;
    }
    
    setNames(names: string[]) {
      this.names = names;
    }
    
    setKeywords(keywords: string[]) {
      this.keywords = keywords;
    }
    
    setOccasion(occasion: string) {
      this.occasion = occasion;
    }
    
    setVenue(venue: string) {
      this.venue = venue;
    }
    
    setCity(city: string) {
      this.city = city;
    }
    
    setState(state: string) {
      this.state = state;
    }
    
    setCountry(country: string) {
      this.country = country;
    }
}
