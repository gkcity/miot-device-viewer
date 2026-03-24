import {Component, OnInit} from '@angular/core';
import {NzPageHeaderModule} from 'ng-zorro-antd/page-header';
import {NzBreadCrumbModule} from 'ng-zorro-antd/breadcrumb';
import {NzSpinModule} from 'ng-zorro-antd/spin';
import {FormsModule} from '@angular/forms';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzTabsModule} from 'ng-zorro-antd/tabs';
import {MainService} from '../../../../service/main.service';
import {NzTableModule, NzTableQueryParams} from 'ng-zorro-antd/table';
import {NzTagModule} from 'ng-zorro-antd/tag';
import {
  LifeCycle,
  ActionType,
  PropertyType,
  EventType,
  ObjectWithLifecycle,
  PropertyDefinition,
  ServiceDefinition,
  ActionDefinition,
  EventDefinition
} from 'xiot-core-spec-ts';
import {ServiceType} from 'xiot-core-spec-ts/dist/xiot/core/spec/typedef/definition/urn/ServiceType';

@Component({
  selector: 'spec-service',
  standalone: true,
  templateUrl: './spec.service.component.html',
  styleUrls: ['./spec.service.component.less'],
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
export class SpecServiceComponent implements OnInit {

  loading: boolean = true;
  services: ServiceType[] = [];

  loadingProperties: boolean = true;
  properties: Map<string, PropertyType> = new Map<string, PropertyType>();

  loadingActions: boolean = true;
  actions: Map<string, ActionType> = new Map<string, ActionType>();

  loadingEvents: boolean = true;
  events: Map<string, EventType> = new Map<string, EventType>();

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
    this.service.getSpecServices()
      .subscribe({
        next: data => {
          this.services = data;
          this.loading = false;
        },
        error: error => {
          this.msg.warning('Failed to getSpecServices: ', error);
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

    this.loadingActions = true;
    this.service.getSpecActions()
      .subscribe({
        next: data => {
          this.actions = new Map(data.map(item => [item.toString(), item]));
          this.loadingActions = false;
        },
        error: error => {
          this.msg.warning('Failed to getSpecActions: ', error);
        }
      })

    this.loadingEvents = true;
    this.service.getSpecEvents()
      .subscribe({
        next: data => {
          this.events = new Map(data.map(item => [item.toString(), item]));
          this.loadingEvents = false;
        },
        error: error => {
          this.msg.warning('Failed to getSpecEvents: ', error);
        }
      })
  }

  // getPropertyDescription(type: PropertyType): string {
  //   const x = this.properties.get(type.name);
  //   if (x) {
  //     return x.description.get('zh-CN') || x.description.get('en-US')  || type.name;
  //   } else {
  //     return type.name;
  //   }
  // }
  //
  // getActionDescription(type: ActionType): string {
  //   const x = this.actions.get(type.name);
  //   if (x) {
  //     return x.description.get('zh-CN') || x.description.get('en-US')  || type.name;
  //   } else {
  //     return type.name;
  //   }
  // }
  //
  // getEventDescription(type: EventType): string {
  //   const x = this.events.get(type.name);
  //   if (x) {
  //     return x.description.get('zh-CN') || x.description.get('en-US')  || type.name;
  //   } else {
  //     return type.name;
  //   }
  // }

  protected readonly LifeCycle = LifeCycle;
}
