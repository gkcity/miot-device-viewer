import {Component, inject} from '@angular/core';
import {NZ_MODAL_DATA, NzModalRef} from 'ng-zorro-antd/modal';
import {FormsModule} from '@angular/forms';
import {JsonData} from './JsonData';
import {NzInputModule} from 'ng-zorro-antd/input';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'json-viewer',
  templateUrl: './json.viewer.component.html',
  styleUrls: ['./json.viewer.component.less'],
  imports: [
    FormsModule,
    NzInputModule,
    JsonPipe,
  ],
  providers: [],
  standalone: true
})
export class JsonViewerComponent {

  readonly #modal = inject(NzModalRef);
  readonly data: JsonData = inject(NZ_MODAL_DATA);
  disabled: boolean = true;

  constructor(
  ) {
  }

  onChanged() {
    this.disabled = false;
  }

  cancel(): void {
    this.#modal.destroy(undefined);
  }

  ok(): void {
    this.#modal.destroy(this.data.value);
  }
}
