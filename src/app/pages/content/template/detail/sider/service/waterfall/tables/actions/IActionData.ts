import {Action, Service} from 'xiot-core-spec-ts';

export interface IActionData {
  did: string;
  service: Service;
  action: Action;
}
