import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'humanizeTime'})
export class HumanizeTimePipe implements PipeTransform {
  MINUTES_PER = [
    {symbol: 'mon', value: 43200},
    {symbol: 'd', value: 1440},
    {symbol: 'h', value: 60},
    {symbol: 'm', value: 1}
  ];

  transform(value: any): string {
    if (Number.isInteger(value)) {
      var res = '';

      this.MINUTES_PER.forEach(el=> {
        if (value / el.value >= 1) {
          var contain = Math.floor(value / el.value);
          res += `${contain}${el.symbol} `;
          value -= contain * el.value;
        }
      });

      return res;
    } else {
      return value;
    }
  }
}
