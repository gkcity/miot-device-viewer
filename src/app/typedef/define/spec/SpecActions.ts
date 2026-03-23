import {ObjectWithLifecycle, ActionDefinition} from 'xiot-core-spec-ts';

export class SpecActions {
  total: number = 0;
  actions: ObjectWithLifecycle<ActionDefinition>[] = [];
}
