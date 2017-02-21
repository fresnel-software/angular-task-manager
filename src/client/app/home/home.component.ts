import {Component, OnInit} from '@angular/core';
import {TaskService} from '../shared/index';
import {TaskInterface} from '../shared/index';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
})
export class HomeComponent implements OnInit {

  errorMessage: string;
  tasks: Array<TaskInterface> = [];
  taskOnDescription: TaskInterface;
  taskForm: {active: boolean; task: TaskInterface;} = {active: false, task: null};

  constructor(public tasksService: TaskService) {
  }

  ngOnInit() {
    this.getTasks();
  }

  objectKeys(object: any): Array<any> {
    return Object.keys(object);
  }

  get totalEstimates() {
    // TODO warning, may be slow on big data!
    return this.tasks.reduce((prev: any, cur: any)=> {
      if (prev[cur.state] !== undefined) {
        prev[cur.state] += cur.estimate;
      } else {
        prev[cur.state] = cur.estimate;
      }
      return prev;
    }, {});
  };

  getTasks(): void {
    this.tasksService.get()
      .subscribe(
        tasks => {
          this.tasks = tasks;
        },
        error => this.errorMessage = <any>error
      );
  }

  taskOnClick(id: string) {
    this.taskOnDescription = this.tasks.filter(el=>el.id === id)[0];
  }

  taskIsActive(id: string): boolean {
    return this.taskOnDescription ? this.taskOnDescription.id === id : false;
  }

  onCloseTaskForm(task: TaskInterface): void {
    this.taskForm.active = false;
    this.taskForm.task = null;
    if (task) {
      if (task.id) {
        this.taskOnEdit(task);
      } else {
        this.taskOnCreate(task);
      }
    }
  }

  taskOnCreate(task: TaskInterface): void {
    this.tasksService.post(task).subscribe(task=> {
      this.tasks.push(task);
    });
  }

  taskOnEdit(task: TaskInterface): void {
    this.tasksService.put(task).subscribe(res=> {
      // TODO reimplement
      console.info('Task was putted: ', res);
    });
  }

  taskOnDelete(task: TaskInterface): void {
    var taskIndex = this.tasks.findIndex(el=>el.id === task.id);
    if (taskIndex !== -1) {
      this.tasks.splice(taskIndex, 1);
    } else {
      console.warn('Cannot find task: ', task);
    }
    this.taskOnDescription = null;
    this.tasksService.del(task).subscribe(res=> {
      console.info('Task was deleted: ', res);
    });
  }

}
