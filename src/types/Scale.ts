import { Degree } from './Degree';

export class Scale {
  degrees: Degree[];

  constructor(degrees: Degree[]) {
    this.degrees = degrees;
  }

  getDegrees() {
    return this.degrees;
  }

  toString() {
    return this.getDegrees()
      .map((degree) => degree.toString())
      .join('');
  }
}
