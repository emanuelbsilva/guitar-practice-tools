import { DEGREES } from './constants';

export class Degree {
  degree: string;

  constructor(degree: string) {
    if (!DEGREES.includes(degree)) throw new Error(`Degree: ${degree} is not a valid degree`);
    this.degree = degree;
  }

  getDegreeNumber() {
    return DEGREES.indexOf(this.degree);
  }

  toString() {
    return this.degree;
  }
}
