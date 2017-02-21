import {Component, Input} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'sd-state',
  template: `<span [ngClass]="stateClass" [title]="key" class="progress-state">{{value}}</span>`,
  styleUrls: ['state.component.css'],
})
export class StateComponent {

  @Input() key: string;
  @Input() value: string;

  get stateClass() {
    switch (this.key.toLowerCase()) {
      case 'completed':
        return 'progress-state--completed';
      case 'in progress':
        return 'progress-state--inProgress';
      case 'planned':
        return 'progress-state--planned';
      default:
        return '';
    }
  }

}
