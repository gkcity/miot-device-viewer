import {ObjectWithLifecycle, UnitDefinition} from 'xiot-core-spec-ts';

export class SpecUnits {
  total: number = 0;
  units: ObjectWithLifecycle<UnitDefinition>[] = [];
}
