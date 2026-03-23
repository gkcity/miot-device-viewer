import {ObjectWithLifecycle, EventDefinition} from 'xiot-core-spec-ts';

export class SpecEvents {
  total: number = 0;
  events: ObjectWithLifecycle<EventDefinition>[] = [];
}
