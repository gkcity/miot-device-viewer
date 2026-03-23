import {ObjectWithLifecycle, ServiceDefinition} from 'xiot-core-spec-ts';

export class SpecServices {
  total: number = 0;
  services: ObjectWithLifecycle<ServiceDefinition>[] = [];
}
