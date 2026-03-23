import {Property, Service} from 'xiot-core-spec-ts';

export class EditableProperty {

  constructor(
    public service: Service,
    public property: Property,
  ) {
  }
}
