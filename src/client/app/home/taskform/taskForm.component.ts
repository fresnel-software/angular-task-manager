import {Component, Input, OnInit, EventEmitter, Output} from '@angular/core';
import {TaskInterface} from '../../shared/index';


@Component({
  moduleId: module.id,
  selector: 'sd-task-form',
  templateUrl: 'taskForm.component.html',
  styleUrls: ['taskForm.component.css'],
})
export class TaskFormComponent implements OnInit {

  @Input() task: TaskInterface;
  @Output() onClose: EventEmitter<TaskInterface> = new EventEmitter();
  taskCopy: TaskInterface;

  ngOnInit() {
    this.taskCopy = this.task ? Object.assign({}, this.task) : new EmptyTask();
  }

  taskIsValid(task: TaskInterface): boolean {
    // TODO implement validation
    return true;
  }

  onSave(): void {
    if (this.taskIsValid(this.taskCopy)) {
      if (this.task) Object.assign(this.task, this.taskCopy);
      this.onClose.emit(this.taskCopy);
    } else {
      // TODO implement error message to user
      console.log('Task is invalid');
    }
  }

}

class EmptyTask implements TaskInterface {
  id = '';
  name = '';
  description = '';
  estimate = 0;
  state = '';
}
