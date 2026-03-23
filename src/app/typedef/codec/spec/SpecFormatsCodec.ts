import {FormatDefinitionWithLifecycleCodec} from 'xiot-core-spec-ts';
import {SpecFormats} from '../../define/spec/SpecFormats';

export class SpecFormatsCodec {

  static decode(x: any): SpecFormats {
    const spec = new SpecFormats();
    spec.total = x.total;
    spec.formats = FormatDefinitionWithLifecycleCodec.decodeArray(x.datalist);
    return spec;
  }
}
