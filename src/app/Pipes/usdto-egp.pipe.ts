import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'USDtoEGP'
})
export class USDtoEGPPipe implements PipeTransform {

  // value is the value that will be passed in the pipe
  transform(value: number, rate: number = 48): number {
    return value * rate;
  }
/*
Usages of the custom pipe:
- We can create a pipe that captures the card number and then retrieves the date of birth 
from the ID number.

- We can create a pipe that converts the price in USD to EGP.

- We can create a pipe that segments the visa card number into four-digit groups.
*/
}
