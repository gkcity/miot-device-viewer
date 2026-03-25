import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewContainerRef} from '@angular/core';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzListModule} from 'ng-zorro-antd/list';
import {DeviceInstance, LifeCycle, Service} from 'xiot-core-spec-ts';
import {NzModalService} from 'ng-zorro-antd/modal';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {FormsModule} from '@angular/forms';
import {NzSpaceModule} from 'ng-zorro-antd/space';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';
import {DeviceInstanceComponent} from '../../../../../common/device/instance/device.instance.component';
import {MainService} from '../../../../../service/main.service';
import {NzSpinModule} from 'ng-zorro-antd/spin';

@Component({
  selector: 'product-instance',
  templateUrl: './product.instance.component.html',
  styleUrls: ['./product.instance.component.less'],
  standalone: true,
  imports: [
    FormsModule,
    NzMenuModule,
    NzLayoutModule,
    NzListModule,
    NzSelectModule,
    NzSpaceModule,
    NzColDirective,
    NzRowDirective,
    NzSpinModule,
    DeviceInstanceComponent,
  ],
  providers: [
    NzModalService
  ],
})
export class ProductInstanceComponent implements OnChanges {

  @Input() device: DeviceInstance | undefined = undefined;
  @Input() version: boolean = false;
  @Output() changed = new EventEmitter<DeviceInstance>();
  @Output() removed = new EventEmitter<Service>();

  protected readonly LifeCycle = LifeCycle;
  protected language = 'en-US';

  constructor(
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef,
    private msg: NzMessageService,
    private service: MainService,
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product']) {
    }
  }

  protected onChanged(device: DeviceInstance) {
    console.log('onChanged!');
  }
}
