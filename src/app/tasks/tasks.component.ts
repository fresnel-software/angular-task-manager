import { Component } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Task } from './task';
import { TaskService } from './task.service';


@Component({
  selector: 'tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {
  selectedTask: Task;
  tasks: Task[] = [];

  constructor(
    private modalService: NgbModal,
    private taskService: TaskService) {
  }

  /**
   * Implements angular's "ngOnInit" method.
   */
  ngOnInit() {
    this.taskService.getTasks()
      .subscribe(
        (data) => this.tasks = data,     // @todo: assert it's what we expect.
        (error) => console.error(error)  // @todo: handle errors.
      );
  }

  /**
   * Getter for the "Planned" tasks.
   */
  get tasksPlanned(): Task[] {
    return this.tasks.filter((task) => this.taskHasStatus(task, 1));
  }

  /**
   * Getter for "In Progress" tasks.
   */
  get tasksInProgress(): Task[] {
    return this.tasks.filter((task) => this.taskHasStatus(task, 2));
  }

  /**
   * Getter for "Completed" tasks.
   */
  get tasksCompleted(): Task[] {
    return this.tasks.filter((task) => this.taskHasStatus(task, 3));
  }

  /**
   * Performs a task action, with an optional callback.
   *
   * @param task
   * @param taskAction
   *   Action to be executed on the task.
   * @param callback
   *   Optional callback function to be executed after the task action
   */
  executeTaskAction(task: Task, taskAction: Function, callback?: Function): void {
    if (typeof taskAction !== 'function') {
      throw new TypeError(`executeTaskAction(): expected "taskAction" parameter to be a function.`);
    }

    // Call the action whithin this class' context.
    taskAction.call(this, task);

    // If we have a callback, make sure it's a function.
    if (callback && typeof callback !== 'function') {
      throw new TypeError(`executeTaskAction(): expected "callback" parameter to be a function.`);
    }
    callback();
  }

  /**
   * Adds a new task to the tasks list.
   *
   * @param newTask
   *   Task to be added.
   */
  createTask(newTask: Task): void {
    // @todo: save on server.
    // Note: I'm creating a dummy ID, since this is an exercise with no backend.
    // Obviously, it's not unique and it might overlap an existing id, but in a
    //real world scenario, we would be getting them from the server.
    newTask.id = this.getRandomId(this.tasks.length);
    this.tasks.push(newTask);
  }

  /**
   * Edits a task in a specified list.
   *
   * @param editedTask
   *   Task to be saved.
   * @param tasks
   *   List of tasks where to add the task.
   */
  editTask(editedTask: Task): void {
    // @todo: save on server.
    // Create a new list, replacing the edited task.
    let tasksList: Task[] = [];
    let exists = false;
    let editedTaskClone = Object.assign({}, editedTask);

    this.tasks.forEach((task) => {
      if (task.id === editedTask.id) {
        tasksList.push(editedTaskClone);
        exists = true;
      }
      else {
        tasksList.push(task);
      }
    });

    // This shouldn't happen, since the edited task must exist in the list.
    if (!exists) {
      throw new Error(`editTask(): Task ${editedTaskClone.title} doesn't exist in the list of tasks.`);
    }

    this.tasks = tasksList;
  }

  /**
   * Deletes a task from the specified list.
   *
   * @param editedTask
   *   Task to be deleted.
   */
  deleteTask(editedTask: Task): void {
    //@todo: delete on server.
    this.tasks = this.tasks.filter(task => task.id !== editedTask.id);
  }

  /**
   * Opens a modal window with the "New Task" view.
   *
   * @param content
   */
  openNewTaskModal(content: any): void {
    // It's a new task, so reset the selected task.
    this.selectedTask = <Task>{};
    this.modalService.open(content);
  }

  /**
   * Opens a modal window with the "Edit Task" view.
   *
   * @param content
   * @param task
   */
  openEditTaskModal(content: any, task: Task): void {
    // Clone the selected task, instead of mutating it. This allows us to
    // 'Cancel' the action, while keeping the original task unaffected.
    this.selectedTask = Object.assign({}, task);
    this.modalService.open(content);
  }

  /**
   * Sums all the hours from the specified status.
   *
   * @param status
   */
  getEstimatedHoursTotal(status: number): number {
    // Since values from the UI come as strings, we need make sure both
    // we compare them both as this type.
    const statusStr: string = status.toString();

    let sum = 0;
    for (let task of this.tasks) {
      if (task.status.toString() === statusStr) {
        sum += task.estimate;
      }
    }
    return sum;
  }

  /**
   * Checks if a task has a certain status.
   *
   * @param task
   * @param status
   */
  taskHasStatus(task: Task, status: number): boolean {
    // Heads up! We need to use the double equal operator, since
    // Angular passes a string value from the selects.
    return task.status == status;
  }

  /**
   * Mock method to create a 'random' integer, between the
   * passed minimum (inclusive) and 1000 (exclusive);
   *
   * @param min
   *   minimum number
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
   */
  getRandomId(min: number): number {
    if (!Number.isInteger(min)) {
      throw new TypeError('getRandomId(): argument expected to be an integer.');
    }

    const max = min + 1000;
    return Math.floor(Math.random() * (max - min)) + min;
  }

}
