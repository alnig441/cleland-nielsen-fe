import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'keyvalueTransform'})

export class KeyvalueTransform implements PipeTransform {
  
  transform(keyvalue: any) {
    let keyValueArray: any = [];
    Object.keys(keyvalue).forEach((key: any) => {
      if (key == 'names' || key == 'venue' || key == 'keywords' || key == 'occasion' || key == 'en' || key == 'da') {
        keyValueArray.push({ key: key , value: keyvalue[key] })
      }
    })
    return keyValueArray;
  }

}