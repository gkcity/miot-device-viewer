import {Service, Property} from 'xiot-core-spec-ts';

export interface IPropertyData {
  did: string;
  service: Service;
  property: Property;
}
