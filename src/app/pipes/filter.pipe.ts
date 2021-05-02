import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(devices: any[], filter: string, filteredAmount: {count: number}): unknown {
    if((filter === '' || !filter)) {
      return devices;
    }
    if(filter){
      filter = filter.toUpperCase();
    }
    let returnDevices = devices
      .filter((device) => {
        if(
          device.model.toUpperCase().includes(filter) || 
          device.person.toUpperCase().includes(filter) ||
          device.group.toUpperCase().includes(filter) || 
          device.category.toUpperCase().includes(filter)
          ) {
          return device;
        }
      }) 
    filteredAmount.count = returnDevices.length;
    return returnDevices;  
  }
  
}
