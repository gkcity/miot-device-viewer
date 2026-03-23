import {Argument, Property} from 'xiot-core-spec-ts';

export class Arg {
  constructor(
    public argument: Argument,
    public property: Property,
    public language: string,
  ) {
  }
}
