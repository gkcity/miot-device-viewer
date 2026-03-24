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
import {
  FormatDefinition, LifeCycle,
  ObjectWithLifecycle,
  PropertyDefinition,
  PropertyType,
  UnitDefinition
} from 'xiot-core-spec-ts';

@Component({
  selector: 'spec-property',
  standalone: true,
  templateUrl: './spec.property.component.html',
  styleUrls: ['./spec.property.component.less'],
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
export class SpecPropertyComponent implements OnInit {

  loading: boolean = true;
  properties: PropertyType[] = [];
  propertyMap: Map<string, PropertyType> = new Map<string, PropertyType>();

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
    this.service.getSpecProperties()
      .subscribe({
        next: data => {
          console.log('getSpecProperties: ', data.length);
          this.properties = data;
          this.propertyMap = new Map(data.map(item => [item.toString(), item]));
          this.loading = false;
        },
        error: error => {
          console.log('getSpecProperties failed: ', error);

          this.msg.warning('Failed to getSpecProperties: ', error);
        }
      })
  }

  protected readonly LifeCycle = LifeCycle;
}
