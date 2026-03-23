import {Property, Service} from 'xiot-core-spec-ts';

export class SelectMember {

  constructor(
    public service: Service,
    public property: Property,
    public language: string,
  ) {
  }
}
