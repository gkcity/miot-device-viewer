import {Urn} from 'xiot-core-spec-ts';

export class MyProduct {

  constructor(
    public status: string,
    public model: string,
    public version: number,
    public type: Urn,
    public ts: number,
  ) {
  }
}
