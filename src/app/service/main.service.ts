import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {SpecUnits} from '../typedef/define/spec/SpecUnits';
import {SpecUnitsCodec} from '../typedef/codec/spec/SpecUnitsCodec';
import {SpecFormats} from '../typedef/define/spec/SpecFormats';
import {SpecFormatsCodec} from '../typedef/codec/spec/SpecFormatsCodec';
import {SpecTemplatesCodec} from '../typedef/codec/template/SpecTemplatesCodec';
import {SpecTemplates} from '../typedef/define/template/SpecTemplates';
import {
  DeviceInstanceCodec,
  DeviceInstanceWithLifecycleCodec,
  DeviceTemplate,
  DeviceTemplateWithLifecycleCodec,
  LifeCycle,
  ObjectWithLifecycle,
  Product,
  ProductCodec,
  DeviceInstance,
  ServiceDefinition, ServiceDefinitionCodec, ActionDefinition, ActionDefinitionCodec, EventDefinition,
  EventDefinitionCodec, PropertyDefinition, PropertyDefinitionCodec,
  DeviceTypeCodec,
  PropertyTypeCodec,
  PropertyType,
  ActionType,
  EventType, ServiceTypeCodec, ActionTypeCodec, EventTypeCodec, DeviceType,
} from 'xiot-core-spec-ts';
import {MyProductCodec} from '../typedef/codec/product/MyProductCodec';
import {MyProduct} from '../typedef/define/product/MyProduct';
import {ServiceType} from 'xiot-core-spec-ts/dist/xiot/core/spec/typedef/definition/urn/ServiceType';

@Injectable({providedIn: 'root'})
export class MainService {
  private server: string = environment.server;

  constructor(
    private http: HttpClient
  ) {
  }

  /**------------------------------------------------------------------------------------------------
   * 产品规范
   *------------------------------------------------------------------------------------------------*/

  getSpecDevices(): Observable<DeviceType[]> {
    return this.http
      .get<any>(`${this.server}/miot-spec-v2/spec/devices`)
      .pipe(map(response => DeviceTypeCodec.decodeArray(response.types)));
  }

  getSpecServices(): Observable<ServiceType[]> {
    return this.http
      .get<any>(`${this.server}/miot-spec-v2/spec/services`)
      .pipe(map(response => ServiceTypeCodec.decodeArray(response.types)));
  }

  getSpecActions(): Observable<ActionType[]> {
    return this.http
      .get<any>(`${this.server}/miot-spec-v2/spec/actions`)
      .pipe(map(response => ActionTypeCodec.decodeArray(response.types)));
  }

  getSpecEvents(): Observable<EventType[]> {
    return this.http
      .get<any>(`${this.server}/miot-spec-v2/spec/events`)
      .pipe(map(response => EventTypeCodec.decodeArray(response.types)));
  }

  getSpecProperties(): Observable<PropertyType[]> {
   return this.http
      .get<any>(`${this.server}/miot-spec-v2/spec/properties`)
      .pipe(map(response => PropertyTypeCodec.decodeArray(response.types)));
  }

  getSpecFormats(pageNum: number, pageSize: number): Observable<SpecFormats> {
    const params = {
      pageNum: pageNum,
      pageSize: pageSize
    }
    return this.http
      .get<any>(`${this.server}/v1/spec/format/list`, {params})
      .pipe(map(response => SpecFormatsCodec.decode(response.data)));
  }

  getSpecUnits(pageNum: number, pageSize: number): Observable<SpecUnits> {
    const params = {
      pageNum: pageNum,
      pageSize: pageSize
    }
    return this.http
      .get<any>(`${this.server}/v1/spec/unit/list`, {params})
      .pipe(map(response => SpecUnitsCodec.decode(response.data)));
  }

  /**------------------------------------------------------------------------------------------------
   * 产品模板
   *------------------------------------------------------------------------------------------------*/

  /**
   * 读取产品模板列表
   */
  getTemplates(pageNum: number, pageSize: number): Observable<SpecTemplates> {
    const params = {
      pageNum: pageNum,
      pageSize: pageSize
    }
    return this.http
      .get<any>(`${this.server}/v1/template/list`, {params})
      .pipe(map(response => SpecTemplatesCodec.decode(response.data)));
  }

  /**
   * 读取产品模板
   */
  getTemplate(type: string): Observable<ObjectWithLifecycle<DeviceTemplate>> {
    const params = {
      type: type
    }
    return this.http
      .get<any>(`${this.server}/v1/template`, {params})
      .pipe(map(response => DeviceTemplateWithLifecycleCodec.decode(response.data)));
  }

  // /**
  //  * 读取产品列表
  //  */
  // getProductsV1(organizationCode: string, pageNum: number, pageSize: number): Observable<JoyProductsV1> {
  //   const params = {
  //     organizationCode: organizationCode,
  //     pageNum: pageNum,
  //     pageSize: pageSize
  //   }
  //   return this.http
  //     .get<any>(`${this.server}/v1/product/list`, {params})
  //     .pipe(map(response => JoyProductsV1Codec.decode(response.data)));
  // }
  //
  // /**
  //  * 读取产品信息
  //  */
  // getProductV1(organizationCode: string, productId: string): Observable<JoyProductV1> {
  //   const params = {
  //     organizationCode: organizationCode,
  //     productId: productId,
  //   }
  //   return this.http
  //     .get<any>(`${this.server}/v1/product`, {params})
  //     .pipe(map(response => JoyProductV1Codec.decode(response.data)));
  // }

  /**------------------------------------------------------------------------------------------------
   * 产品（基本信息、配网引导、功能、控制页、固件、手册）
   *------------------------------------------------------------------------------------------------*/

  /**
   * 读取产品列表
   */
  // getFullProducts(organizationCode: string, pageIndex: number, pageSize: number): Observable<JoyProducts> {
  //   const params = {
  //     organization: organizationCode,
  //     index: pageIndex,
  //     size: pageSize
  //   }
  //   return this.http
  //     .get<any>(`${this.server}/v2/product/full/all`, {params})
  //     .pipe(map(response => JoyProductsCodec.decode(response.data)));
  // }

  /**------------------------------------------------------------------------------------------------
   * 产品基本信息
   *------------------------------------------------------------------------------------------------*/

  /**
   * 读取产品列表
   */
  getProducts(): Observable<MyProduct[]> {
    console.log('getProducts');
    return this.http
      .get<any>(`${this.server}/miot-spec-v2/instances?status=all`)
      .pipe(map(response => MyProductCodec.decodeArray(response.instances)));
  }

  /**
   * 创建产品基本信息
   */
  createProduct(product: Product): Observable<Number> {
    return this.http
      .post<any>(`${this.server}/v2/product/basic/one`, ProductCodec.encode(product))
      .pipe(map(response => response.data.id));
  }

  /**
   * 删除产品基本信息
   */
  deleteProduct(productId: number): Observable<void> {
    const params = {
      productId: productId,
    }
    return this.http
      .delete<any>(`${this.server}/v2/product/basic/one`, {params})
      .pipe(map(() => undefined));
  }

  /**
   * 修改产品基本信息
   */
  updateProduct(product: Product, fields: Map<string, any>): Observable<void> {
    fields.set('organization', product.organization);
    fields.set('model', product.model);

    const body = Object.fromEntries(fields);

    return this.http
      .put<any>(`${this.server}/v2/product/basic/one`, body)
      .pipe(map(() => undefined));
  }

  /**
   * 读取产品基本信息
   */
  getProduct(productId: number): Observable<Product> {
    const params = {
      productId: productId,
    }
    return this.http
      .get<any>(`${this.server}/v2/product/basic/one`, {params})
      .pipe(map(response => ProductCodec.decode(response.data)));
  }

  /**
   * 申请上线（开发者），取消上线申请（开发者）， 批准上线（管理员，或QA）
   */
  setProductLifecycle(productId: number, lifecycle: LifeCycle): Observable<void> {
    const body = {
      productId: productId,
    }
    return this.http
      .put<any>(`${this.server}/v2/product/lifecycle/${lifecycle.toString()}`, body)
      .pipe(map(() => undefined));
  }

  /**------------------------------------------------------------------------------------------------
   * 产品配网引导
   *------------------------------------------------------------------------------------------------*/

  /**
   * 申请上线（开发者），取消上线申请（开发者）， 批准上线（管理员，或QA）
   */
  setProductWizardLifecycle(productId: number, lifecycle: LifeCycle): Observable<void> {
    const body = {
      productId: productId,
    }
    return this.http
      .put<any>(`${this.server}/v2/product/wizard/lifecycle/${lifecycle.toString()}`, body)
      .pipe(map(() => undefined));
  }

  /**------------------------------------------------------------------------------------------------
   * 产品功能
   *------------------------------------------------------------------------------------------------*/

  // /**
  //  * 读取产品功能版本
  //  */
  // getProductInstances(productId: number): Observable<ProductInstance[]> {
  //   const params = {
  //     productId: productId,
  //   }
  //   return this.http
  //     .get<any>(`${this.server}/v2/product/instance/all`, {params})
  //     .pipe(map(response => ProductInstanceCodec.decodeArray(response.data.instances)));
  // }

  /**
   * 创建产品功能版本
   */
  createProductInstance(productId: number, instance: DeviceInstance): Observable<void> {
    const body = {
      productId: productId,
      definition: DeviceInstanceCodec.encode(instance)
    };

    return this.http
      .post<any>(`${this.server}/v2/product/instance/one`, body)
      .pipe(map(() => undefined));
  }

  /**
   * 删除产品功能版本
   */
  deleteProductInstance(type: string): Observable<void> {
    return this.http
      .delete<any>(`${this.server}/v2/product/instance/one/${type}`)
      .pipe(map(() => undefined));
  }

  /**
   * 修改产品功能版本
   */
  updateProductInstance(instance: DeviceInstance): Observable<void> {
    return this.http
      .put<any>(`${this.server}/v2/product/instance/one`, DeviceInstanceCodec.encode(instance))
      .pipe(map(() => undefined));
  }

  /**
   * 读取产品功能版本
   */
  getProductInstance(type: string): Observable<DeviceInstance> {
    return this.http
      .get<any>(`${this.server}/miot-spec-v2/instance?type=${type}`)
      .pipe(map(response => DeviceInstanceCodec.decode(response)));
  }
}
