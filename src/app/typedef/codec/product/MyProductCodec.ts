import {DeviceType, Product} from 'xiot-core-spec-ts';
import {MyProduct} from '../../define/product/MyProduct';

export class MyProductCodec {

  // {
  //       "status": "released",
  //       "model": "lfsmt.plug.ls060",
  //       "version": 1,
  //       "type": "urn:miot-spec-v2:device:outlet:0000A002:lfsmt-ls060:1",
  //       "ts": 1527766817
  // }
  static decode(o: any): MyProduct {
    const status = o.status || 'released';
    const model = o.model || '?';
    const version = o.version || 0;
    const type = DeviceType.parse(o.type || '?');
    const ts = o.ts || 0;
    return new MyProduct(status, model, version, type, ts);
  }

  static decodeArray(arr: any[]): MyProduct[] {
    return arr.map(o => MyProductCodec.decode(o));
  }
}
