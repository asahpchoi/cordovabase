import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchText'
})
export class SearchTextPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if(!searchText) return;
    return items.filter(x=>x.label.toLowerCase().includes(searchText.toLowerCase()));
  }

}
