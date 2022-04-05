import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'fixNum'
})
export class FixNumPipe implements PipeTransform {
  transform(value: number): number {
    return Math.floor(value * 100) / 100
  }
}