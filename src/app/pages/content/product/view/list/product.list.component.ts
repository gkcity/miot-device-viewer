import {Component, OnDestroy, OnInit} from '@angular/core';
import {NzTableFilterFn, NzTableModule, NzTableSortFn} from 'ng-zorro-antd/table';
import {RouterLink} from '@angular/router';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzImageModule} from 'ng-zorro-antd/image';
import {NzTagModule} from 'ng-zorro-antd/tag';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';
import {FormsModule} from '@angular/forms';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzCheckboxModule} from 'ng-zorro-antd/checkbox';
import {MainService} from '../../../../../service/main.service';
import {MyProduct} from '../../../../../typedef/define/product/MyProduct';
import {NzSpinModule} from 'ng-zorro-antd/spin';

interface CategoryFilter {
  text: string,
  value: string
}

@Component({
  selector: 'product-list',
  standalone: true,
  templateUrl: './product.list.component.html',
  styleUrls: ['./product.list.component.less'],
  imports: [
    FormsModule,
    RouterLink,
    NzInputModule,
    NzTableModule,
    NzButtonModule,
    NzDividerModule,
    NzIconModule,
    NzImageModule,
    NzTagModule,
    NzDropDownModule,
    NzColDirective,
    NzRowDirective,
    NzCardModule,
    NzCheckboxModule,
    NzSpinModule,
  ],
})
export class ProductListComponent implements OnInit, OnDestroy {

  loading: boolean = true;
  products: MyProduct[] = [];

  categorySortFn: NzTableSortFn<MyProduct> = (a: MyProduct, b: MyProduct): number => a.type.name.localeCompare(b.type.name);
  categoryFilters: CategoryFilter[] = [
    {
      text: 'development', value: "development"
    }
  ];
  categoryFilterFn: NzTableFilterFn<MyProduct> = (list: string[], a: MyProduct) => list.some(name => a.type.name.includes(name));

  modelSortFn: NzTableSortFn<MyProduct> = (a: MyProduct, b: MyProduct): number => a.type.v2modified.localeCompare(b.type.v2modified);

  typeSortFn: NzTableSortFn<MyProduct> = (a: MyProduct, b: MyProduct): number => a.type.toString().localeCompare(b.type.toString());

  statusSortFn: NzTableSortFn<MyProduct> = (a: MyProduct, b: MyProduct): number => a.status.localeCompare(b.status);
  statusFilters = [
    {
      text: 'development', value: "debug"
    },
    {
      text: 'preview', value: "preview"
    },
    {
      text: 'released', value: "released"
    }
  ]
  statusFilterFn: NzTableFilterFn<MyProduct> = (list: string[], a: MyProduct) => list.some(name => a.status.includes(name));

  constructor(
    private service: MainService,
    private msg: NzMessageService,
  ) {
  }

  ngOnInit() {
    this.loadProductsFromServer();
  }

  ngOnDestroy() {
  }

  loadProductsFromServer() {
    this.loading = true;
    this.service.getProducts().subscribe({
      next: data => {
        this.products = data;

        const newFilters: CategoryFilter[] = [];
        const map: Map<String, String> = new Map<String, String>();
        for (let product of this.products) {
          if (! map.has(product.type.name)) {
            map.set(product.type.name, product.type.name);

            newFilters.push({ text: product.type.name, value: product.type.name })
          }
        }

        this.categoryFilters = this.categoryFilters.concat(newFilters);

        console.log('categoryFilters.size: ' + this.categoryFilters.length);
        this.loading = false;
      },
      error: error => {
        this.msg.warning('Failed to getProducts', error);
      }
    })
  }
}
