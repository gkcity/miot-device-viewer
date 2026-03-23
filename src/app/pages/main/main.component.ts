import {Component, inject, OnInit} from '@angular/core';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzSpinModule} from 'ng-zorro-antd/spin';
import pkg from '../../../../package.json';
import {NzBreadCrumbModule} from 'ng-zorro-antd/breadcrumb';
import {RouterLink, RouterOutlet} from '@angular/router';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';
import {NzAvatarModule} from 'ng-zorro-antd/avatar';
import {NzSpaceModule} from 'ng-zorro-antd/space';
import {NzBadgeModule} from 'ng-zorro-antd/badge';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less'],
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    NzIconModule,
    NzLayoutModule,
    NzMenuModule,
    NzSpinModule,
    NzBreadCrumbModule,
    NzButtonModule,
    NzDropDownModule,
    NzAvatarModule,
    NzSpaceModule,
    NzBadgeModule,
  ],
})
export class MainComponent implements OnInit {

  version: string = pkg.version;
  loading: boolean = true;

  pin: string = '?';

  constructor(
    private msg: NzMessageService,
  ) {
  }

  ngOnInit() {
  }
}
