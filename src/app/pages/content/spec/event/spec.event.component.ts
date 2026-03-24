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
  EventDefinition,
  EventType,
  LifeCycle,
  ObjectWithLifecycle,
  PropertyDefinition,
  PropertyType
} from 'xiot-core-spec-ts';

@Component({
  selector: 'spec-event',
  standalone: true,
  templateUrl: './spec.event.component.html',
  styleUrls: ['./spec.event.component.less'],
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
export class SpecEventComponent implements OnInit {

  loading: boolean = true;
  events: EventType[] = [];

  loadingProperties: boolean = true;
  properties: Map<string, PropertyType> = new Map<string, PropertyType>();

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
    this.service.getSpecEvents()
      .subscribe({
        next: data => {
          this.events = data;
          this.loading = false;
        },
        error: error => {
          this.msg.warning('Failed to getSpecEvents: ', error);
        }
      })

    this.loadingProperties = true;
    this.service.getSpecProperties()
      .subscribe({
        next: data => {
          this.properties = new Map(data.map(item => [item.toString(), item]));
          this.loadingProperties = false;
        },
        error: error => {
          this.msg.warning('Failed to getSpecProperties: ', error);
        }
      })
  }

  protected readonly LifeCycle = LifeCycle;
}
