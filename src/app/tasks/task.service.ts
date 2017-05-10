import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { Task } from './task';


@Injectable()
export class TaskService {

  constructor(private http: Http) { }

  getTasks() {
    // Simulate json response.
    const mockData = {
      "data": [
        {
          "id": 0,
          "title": "Buy groceries",
          "description": "Get milk, eggs and pancakes!",
          "estimate": 1.5,
          "status": 1
        },
        {
          "id": 1,
          "title": "Finish homework",
          "description": "Pending",
          "estimate": 2,
          "status": 1
        },
        {
          "id": 2,
          "title": "Add search",
          "description": "Create a search to filter by title.",
          "estimate": 6,
          "status": 2
        },
        {
          "id": 3,
          "title": "Call mom",
          "description": "Ask her about the dog.",
          "estimate": 4.5,
          "status": 3
        },
        {
          "id": 4,
          "title": "Run a marathon",
          "description": "More details about this task here.",
          "estimate": 4.5,
          "status": 3
        },
        {
          "id": 5,
          "title": "Learn something new today",
          "description": "Do some research on interesting things every day, and learn!",
          "estimate": 1.25,
          "status": 3
        },
        {
          "id": 6,
          "title": "Make tasks dragable",
          "description": "Users should be able to drag and drop the tasks",
          "estimate": 5.5,
          "status": 1
        }
      ]
    };

    return Observable.of(mockData).map(response => response.data);
  }

  //... other methods.

}
