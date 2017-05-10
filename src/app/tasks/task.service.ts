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
      data: []
    };

    return Observable.of(mockData).map(response => response.data);
  }

  //... other methods.

}
