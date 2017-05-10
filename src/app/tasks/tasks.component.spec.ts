/* tslint:disable:no-unused-variable */
import { TestBed, async, inject } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TaskService } from './task.service';
import { TasksComponent } from './tasks.component';
import { Task } from './task';

describe('TasksComponent', () => {
  let component: TasksComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TasksComponent
      ],
      imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        NgbModule.forRoot()
      ],
      providers: [TaskService]
    });

    const fixture = TestBed.createComponent(TasksComponent);
    component = fixture.componentInstance;
  });

  it('should have a defined component', () => {
      expect(component).toBeDefined();
  });

  it('should have a "tasks" property, which is by default an empty array.', () => {
      expect(component.tasks).toEqual([]);
  });

  describe('TasksComponent Task Actions', () => {
    let mockTasks: Task[] = [
      {
        id: 0,
        title: 'First task',
        description: 'Description here.',
        estimate: 2,
        status: 1
      },
      {
        id: 1,
        title: 'Second task',
        description: 'Description here.',
        estimate: 5,
        status: 2
      },
    ];
    let editedTask: Task = {
      id: 1,
      title: 'Second task (edited)',
      description: 'Description here. (edited)',
      estimate: 6,
      status: 3
    };

    afterEach(() => {
      component.tasks = [];
    });

    it('should add a new task to the tasks list.', () => {
        let tasksLenBefore = component.tasks.length;
        let newTask: Task = {
          id: undefined,
          title: 'New task',
          description: 'Description here.',
          estimate: 4,
          status: 1
        };
        component.createTask(newTask);

        expect(component.tasks.length).toBe(tasksLenBefore + 1);
        expect(component.tasks).toContain(newTask);
    });

    it(`should edit a task from the list.`, () => {
        component.tasks = mockTasks;

        let taskToEdit: Task = {
          id: 0,
          title: 'New task (Edited)',
          description: 'Description here.',
          estimate: 4,
          status: 1
        };

        component.editTask(taskToEdit);

        // Find the task after being modified.
        let foundTask = component.tasks
          .find((mt) => mt.id === taskToEdit.id);

        expect(foundTask).toEqual(taskToEdit);
    });

    it(`should throw an error if a task with the same edited task's id is not found in the tasks list.`, () => {
        expect(() => component.editTask(editedTask)).toThrowError();
    });

    it(`should delete a task from the tasks list.`, () => {
      component.tasks = mockTasks;

      let taskToDelete = Object.assign({}, component.tasks[0]);
      component.deleteTask(taskToDelete);

      expect(component.tasks).not.toContain(taskToDelete);
    });

    it(`should throw an error if the task action callback is not a function.`, () => {
      let task = Object.assign({}, component.tasks[0]);

      expect(() => component.executeTaskAction(task, undefined)).toThrowError(TypeError);
    });

  });

  it(`should expect the estimated total to be a number.`, () => {
    let total = component.getEstimatedHoursTotal(1);
    expect(typeof total === 'number').toBe(true);
  });

  it(`should throw an error if the minimum parameter to generate a random id is not an integer.`, () => {
      expect(() => component.getRandomId(undefined)).toThrowError();
  });

  it(`should expect a random id to be an integer.`, () => {
    let id = component.getRandomId(100);
    expect(Number.isInteger(id)).toBe(true);
  });

});
