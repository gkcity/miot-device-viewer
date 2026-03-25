import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {NzPageHeaderModule} from 'ng-zorro-antd/page-header';
import {NzBreadCrumbModule} from 'ng-zorro-antd/breadcrumb';
import {NzSpinModule} from 'ng-zorro-antd/spin';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzCheckboxModule} from 'ng-zorro-antd/checkbox';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzInputModule} from 'ng-zorro-antd/input';
import {ActivatedRoute, Router} from '@angular/router';
import {NzTabsModule} from 'ng-zorro-antd/tabs';
import {DeviceInstance, DeviceInstanceCodec} from 'xiot-core-spec-ts';
import {MainService} from '../../../../service/main.service';
import {NzSpaceModule} from 'ng-zorro-antd/space';
import {NzTagModule} from 'ng-zorro-antd/tag';
import {ProductInstanceComponent} from './instance/product.instance.component';
import {JsonViewerComponent} from '../../../../common/device/instance/dialog/view/json/json.viewer.component';
import {JsonData} from '../../../../common/device/instance/dialog/view/json/JsonData';
import {NzModalService} from 'ng-zorro-antd/modal';

@Component({
  selector: 'product-detail',
  standalone: true,
  templateUrl: './product.detail.component.html',
  styleUrls: ['./product.detail.component.less'],
  imports: [
    ReactiveFormsModule,
    NzPageHeaderModule,
    NzBreadCrumbModule,
    NzSpinModule,
    NzCardModule,
    NzButtonModule,
    NzCheckboxModule,
    NzTabsModule,
    NzFormModule,
    NzInputModule,
    NzSpaceModule,
    NzTagModule,
    ProductInstanceComponent,
    FormsModule,
  ],
  providers: [
    NzModalService
  ]
})
export class ProductDetailComponent implements OnInit {

  loading: boolean = true;
  type: string = '';
  instance!: DeviceInstance;
  version: boolean = false;

  constructor(
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef,
    private route: ActivatedRoute,
    private msg: NzMessageService,
    private router: Router,
    private service: MainService,
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.type = params['type'];
      this.load(this.type);
    });
  }

  private load(type: string): void {
    this.loading = true;
    this.service.getProductInstance(type).subscribe({
      next: data => {
        this.instance = data;
        this.loading = false;
      },
      error: error => {
        this.msg.warning('Failed to getProductInstance', error);
      }
    });
  }

  protected onBack() {
    this.router.navigate(['/main/product']).then(() => {});
  }

  protected onView() {
    if (this.instance) {
      const data = DeviceInstanceCodec.encode(this.instance);

      this.modal.create<JsonViewerComponent, JsonData, void>({
        nzTitle: 'JSON',
        nzWidth: 800,
        nzContent: JsonViewerComponent,
        nzViewContainerRef: this.viewContainerRef,
        nzData: new JsonData(data),
        nzFooter: [
          {
            label: 'Close',
            type: 'primary',
            onClick: component => component!.ok()
          }
        ],
        nzDraggable: true,
      });
    }
  }

  protected onDownload() {
    if (this.instance) {
      const data = DeviceInstanceCodec.encode(this.instance);

      // 1. 将数据转换为 JSON 字符串
      const jsonString = JSON.stringify(data, null, 2); // 第三个参数是缩进空格数

      // 2. 创建 Blob 对象
      const blob = new Blob([jsonString], { type: 'application/json' });

      // 3. 创建下载链接
      const url = window.URL.createObjectURL(blob);

      // 4. 创建临时链接元素
      const link = document.createElement('a');
      link.href = url;
      link.download = `data-${new Date().getTime()}.json`; // 设置文件名

      // 5. 触发点击下载
      link.click();

      // 6. 清理 URL 对象
      window.URL.revokeObjectURL(url);
    }
  }
}
