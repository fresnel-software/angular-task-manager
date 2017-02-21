import {Component, Input} from '@angular/core';
import {TaskInterface} from '../../shared/index';


@Component({
  moduleId: module.id,
  selector: 'sd-task',
  templateUrl: 'task.component.html',
  styleUrls: ['task.component.css'],
})
export class TaskComponent {

  @Input() task: TaskInterface;
  @Input() taskIsActive: boolean = false;

}
