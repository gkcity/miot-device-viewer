import {Component, OnInit} from '@angular/core';
import {NzPageHeaderModule} from 'ng-zorro-antd/page-header';
import {NzBreadCrumbModule} from 'ng-zorro-antd/breadcrumb';
import {NzSpinModule} from 'ng-zorro-antd/spin';
import {FormsModule} from '@angular/forms';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzTabsModule} from 'ng-zorro-antd/tabs';
import {MainService} from '../../../../service/main.service';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzTagModule} from 'ng-zorro-antd/tag';
import {DeviceType, LifeCycle} from 'xiot-core-spec-ts';

@Component({
  selector: 'spec-device',
  standalone: true,
  templateUrl: './spec.device.component.html',
  styleUrls: ['./spec.device.component.less'],
  imports: [
    FormsModule,
    NzPageHeaderModule,
    NzBreadCrumbModule,
    NzSpinModule,
    NzCardModule,
    NzTabsModule,
    NzTableModule,
    NzTagModule,
  ],
})
export class SpecDeviceComponent implements OnInit {

  loading: boolean = true;
  devices: DeviceType[] = [];

  constructor(
    private service: MainService,
    private msg: NzMessageService,
  ) {
  }

  ngOnInit() {
    this.loadDataFromServer();
  }

  loadDataFromServer(): void {
    this.loading = true;
    this.service.getSpecDevices()
      .subscribe({
        next: data => {
          this.devices = data;
          this.loading = false;
        },
        error: error => {
          this.msg.warning('Failed to getSpecDevices: ', error);
        }
      })
  }

  protected readonly LifeCycle = LifeCycle;
}
