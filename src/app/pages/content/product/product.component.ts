import {Component, OnInit} from '@angular/core';
import {NzPageHeaderModule} from 'ng-zorro-antd/page-header';
import {NzBreadCrumbModule} from 'ng-zorro-antd/breadcrumb';
import {NzSpinModule} from 'ng-zorro-antd/spin';
import {FormsModule} from '@angular/forms';
import {MainService} from '../../../service/main.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {ProductListComponent} from './view/list/product.list.component';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';

@Component({
  selector: 'main-product',
  standalone: true,
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.less'],
  imports: [
    NzPageHeaderModule,
    NzBreadCrumbModule,
    NzSpinModule,
    FormsModule,
    ProductListComponent,
    NzRowDirective,
    NzColDirective,
  ],
})
export class ProductComponent {

  constructor(
    private service: MainService,
    private msg: NzMessageService,
  ) {
  }
}
